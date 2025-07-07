import { Module } from '@nestjs/common';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesService } from '../../adapters/habitaciones.service';
import { PrismaService } from '../../infrastructure/prisma.service';

@Module({
  controllers: [HabitacionesController],
  providers: [HabitacionesService, PrismaService],
})
export class HabitacionesModule {}
