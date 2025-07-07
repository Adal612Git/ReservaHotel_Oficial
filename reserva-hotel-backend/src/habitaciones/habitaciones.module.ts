import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { HabitacionesController } from './habitaciones.controller';
import { HabitacionesService } from './habitaciones.service';

@Module({
  imports: [PrismaModule],
  controllers: [HabitacionesController],
  providers: [HabitacionesService],
})
export class HabitacionesModule {}