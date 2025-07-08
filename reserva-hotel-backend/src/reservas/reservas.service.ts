import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { EstadoReserva, Rol } from '@prisma/client';
import xss from 'xss';

@Injectable()
export class ReservasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservaDto, user: { sub: number; role: Rol }) {
    const habitacion = await this.prisma.habitacion.findUnique({ where: { id: dto.habitacionId } });
    if (!habitacion) throw new NotFoundException('Habitacion no encontrada');

    const clienteId =
      user.role === 'RECEPCIONISTA' && dto.clienteId ? dto.clienteId : user.sub;

    const overlap = await this.prisma.reserva.findFirst({
      where: {
        habitacionId: dto.habitacionId,
        estado: { not: EstadoReserva.CANCELADA },
        OR: [
          {
            fechaInicio: { lte: new Date(dto.fechaFin) },
            fechaFin: { gte: new Date(dto.fechaInicio) },
          },
        ],
      },
    });
    if (overlap) throw new BadRequestException('Habitacion no disponible en esas fechas');

    const nights =
      (new Date(dto.fechaFin).getTime() - new Date(dto.fechaInicio).getTime()) /
      (1000 * 60 * 60 * 24);
    if (nights <= 0) throw new BadRequestException('Fechas invalidas');

    const costo = nights * habitacion.precio;

    return this.prisma.reserva.create({
      data: {
        clienteId,
        habitacionId: dto.habitacionId,
        fechaInicio: new Date(dto.fechaInicio),
        fechaFin: new Date(dto.fechaFin),
        costo,
        comentario: dto.comentario ? xss(dto.comentario) : undefined,
        estado: EstadoReserva.PENDIENTE,
      },
    });
  }

  async findAll(user: { sub: number; role: Rol }, query: any) {
    const where: any = {};
    if (user.role === 'CLIENTE') where.clienteId = user.sub;
    if (query.estado) where.estado = query.estado;
    if (query.desde && query.hasta) {
      where.AND = [
        { fechaInicio: { gte: new Date(query.desde) } },
        { fechaFin: { lte: new Date(query.hasta) } },
      ];
    }
    return this.prisma.reserva.findMany({
      where,
      include: { habitacion: true, cliente: true },
    });
  }

  async update(id: number, dto: UpdateReservaDto, user: { sub: number; role: Rol }) {
    const reserva = await this.prisma.reserva.findUnique({ where: { id } });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');
    if (reserva.estado === EstadoReserva.CANCELADA)
      throw new BadRequestException('Reserva cancelada');
    if (user.role === 'CLIENTE' && reserva.clienteId !== user.sub)
      throw new ForbiddenException();

    if (dto.fechaInicio && dto.fechaFin) {
      const overlap = await this.prisma.reserva.findFirst({
        where: {
          id: { not: id },
          habitacionId: reserva.habitacionId,
          estado: { not: EstadoReserva.CANCELADA },
          OR: [
            {
              fechaInicio: { lte: new Date(dto.fechaFin) },
              fechaFin: { gte: new Date(dto.fechaInicio) },
            },
          ],
        },
      });
      if (overlap) throw new BadRequestException('Habitacion no disponible en esas fechas');
    }

    return this.prisma.reserva.update({
      where: { id },
      data: {
        fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : undefined,
        fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
        comentario: dto.comentario ? xss(dto.comentario) : undefined,
      },
    });
  }

  async cancel(id: number, user: { sub: number; role: Rol }) {
    const reserva = await this.prisma.reserva.findUnique({ where: { id } });
    if (!reserva) throw new NotFoundException('Reserva no encontrada');
    if (user.role === 'CLIENTE' && reserva.clienteId !== user.sub)
      throw new ForbiddenException();
    if (new Date(reserva.fechaInicio) <= new Date())
      throw new BadRequestException('La reserva ya comenzó');

    return this.prisma.reserva.update({
      where: { id },
      data: { estado: EstadoReserva.CANCELADA },
    });
  }
}
