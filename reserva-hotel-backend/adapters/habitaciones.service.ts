import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructure/prisma.service';
import { Habitacion } from '../core/habitacion.entity';
import { CreateHabitacionUseCase } from '../core/create-habitacion.usecase';
import { ListHabitacionesUseCase } from '../core/list-habitaciones.usecase';

@Injectable()
export class HabitacionesService
  implements CreateHabitacionUseCase, ListHabitacionesUseCase
{
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Habitacion[]> {
    return this.prisma.habitacion.findMany();
  }

  async create(data: Omit<Habitacion, 'id'>): Promise<Habitacion> {
    return this.prisma.habitacion.create({ data });
  }
}
