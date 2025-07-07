import { Body, Controller, Get, Post } from '@nestjs/common';
import { HabitacionesService } from '../../adapters/habitaciones.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { Habitacion } from '../../core/habitacion.entity';

@Controller('habitaciones')
export class HabitacionesController {
  constructor(private readonly service: HabitacionesService) {}

  @Get()
  async findAll(): Promise<Habitacion[]> {
    return this.service.findAll();
  }

  @Post()
  async create(@Body() dto: CreateHabitacionDto): Promise<Habitacion> {
    return this.service.create(dto);
  }
}
