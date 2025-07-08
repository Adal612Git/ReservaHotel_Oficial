import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';

@Module({
  imports: [PrismaModule],
  providers: [ReservasService],
  controllers: [ReservasController],
})
export class ReservasModule {}
