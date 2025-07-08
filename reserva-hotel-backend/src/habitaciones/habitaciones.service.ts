import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { EstadoHabitacion, Habitacion } from '@prisma/client';

@Injectable()
export class HabitacionesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Habitacion[]> {
    return this.prisma.habitacion.findMany();
  }

  async create(dto: CreateHabitacionDto): Promise<Habitacion> {
    try {
      return await this.prisma.habitacion.create({
        data: {
          numero: dto.numero,
          estado: dto.estado,
          precio: dto.precio,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('El numero de habitacion ya existe');
      }
      throw error;
    }
  }
}
