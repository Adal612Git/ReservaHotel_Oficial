import { PartialType } from '@nestjs/mapped-types';
import { CreateReservaDto } from './create-reserva.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateReservaDto extends PartialType(CreateReservaDto) {
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}
