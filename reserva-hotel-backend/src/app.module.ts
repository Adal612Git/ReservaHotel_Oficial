import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitacionesModule } from './habitaciones/habitaciones.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, HabitacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
