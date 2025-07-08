import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { EstadoHabitacion, Habitacion } from '@prisma/client';
import { HabitacionesService } from './habitaciones.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Get()
  findAll(): Promise<Habitacion[]> {
    return this.habitacionesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateHabitacionDto): Promise<Habitacion> {
    return this.habitacionesService.create(dto);
  }
}
