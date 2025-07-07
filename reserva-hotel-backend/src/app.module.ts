import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitacionesModule } from './habitaciones/habitaciones.module';

@Module({
  imports: [HabitacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
