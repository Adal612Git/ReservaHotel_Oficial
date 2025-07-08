import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { TwoFaDto } from './dto/two-fa.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/setup')
  setup2fa(@CurrentUser() user: any) {
    return this.auth.setup2fa(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('2fa/verify')
  verify2fa(@CurrentUser() user: any, @Body() dto: TwoFaDto) {
    return this.auth.verify2fa(user.sub, dto.code);
  }
}
