import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { Habitacion } from './habitacion.entity';
import { HabitacionesService } from './habitaciones.service';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly habitacionesService: HabitacionesService) {}

  @Get()
  findAll(): Promise<Habitacion[]> {
    return this.habitacionesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateHabitacionDto): Promise<Habitacion> {
    return this.habitacionesService.create(dto);
  }
}