import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { EstadoHabitacion } from './estado-habitacion.enum';
import { Habitacion } from './habitacion.entity';

@Injectable()
export class HabitacionesService {
  private habitaciones: Habitacion[] = [];
  private nextId = 1;

  findAll(): Habitacion[] {
    return this.habitaciones;
  }

  create(dto: CreateHabitacionDto): Habitacion {
    if (this.habitaciones.some((h) => h.numero === dto.numero)) {
      throw new BadRequestException('El numero de habitacion ya existe');
    }

    const habitacion: Habitacion = {
      id: this.nextId++,
      numero: dto.numero,
      estado: dto.estado,
      precio: dto.precio,
    };
    this.habitaciones.push(habitacion);
    return habitacion;
  }
}
