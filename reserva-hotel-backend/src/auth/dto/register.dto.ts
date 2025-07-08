import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { Rol } from '@prisma/client';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, {
    message: 'Password too weak',
  })
  password: string;

  @IsEnum(Rol)
  rol: Rol;
}
