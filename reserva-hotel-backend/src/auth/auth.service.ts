import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class AuthService {
  private readonly saltRounds = 12;
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, this.saltRounds);
    const user = await this.prisma.usuario.create({
      data: {
        nombre: dto.nombre,
        email: dto.email,
        contraseña: hash,
        rol: dto.rol,
      },
    });
    return { id: user.id, email: user.email };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.prisma.usuario.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(pass, user.contraseña);
    return valid ? user : null;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException();
    if (user.twoFactorSecret) {
      if (
        !dto.twoFactorCode ||
        !speakeasy.totp.verify({
          secret: user.twoFactorSecret,
          encoding: 'base32',
          token: dto.twoFactorCode,
        })
      )
        throw new UnauthorizedException('Invalid 2FA code');
    }
    const payload = { sub: user.id, email: user.email, role: user.rol };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_ACCESS_EXPIRES', '15m'),
      secret: this.config.get('JWT_ACCESS_SECRET'),
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES', '7d'),
      secret: this.config.get('JWT_REFRESH_SECRET'),
    });
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: { refreshToken: dto.remember ? refreshToken : null },
    });
    return { accessToken, refreshToken };
  }

  async setup2fa(userId: number) {
    const secret = speakeasy.generateSecret({ length: 20 });
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { twoFactorSecret: secret.base32 },
    });
    const otpauth = secret.otpauth_url ?? '';
    const qr = await qrcode.toDataURL(otpauth);
    return { qr };
  }

  async verify2fa(userId: number, code: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });
    if (!user?.twoFactorSecret) throw new UnauthorizedException();
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: code,
    });
    if (!verified) throw new UnauthorizedException('Invalid 2FA code');
    return { verified: true };
  }
}
