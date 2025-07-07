import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { EstadoHabitacion } from '../../core/habitacion.entity';

export class CreateHabitacionDto {
  @IsInt()
  numero: number;

  @IsEnum(EstadoHabitacion)
  estado: EstadoHabitacion;

  @IsPositive()
  precio: number;
}
