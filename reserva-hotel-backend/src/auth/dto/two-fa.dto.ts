import { IsString } from 'class-validator';

export class TwoFaDto {
  @IsString()
  code: string;
}
