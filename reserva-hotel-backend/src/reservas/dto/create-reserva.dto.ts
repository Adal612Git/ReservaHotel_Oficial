import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  habitacionId: number;

  @IsInt()
  @IsOptional()
  clienteId?: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsOptional()
  @IsString()
  comentario?: string;
}
