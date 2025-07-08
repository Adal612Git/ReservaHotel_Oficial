import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Rol } from '@prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(
    @Body() dto: CreateReservaDto,
    @CurrentUser() user: { sub: number; role: Rol },
  ) {
    return this.reservasService.create(dto, user);
  }

  @Get()
  findAll(@CurrentUser() user: { sub: number; role: Rol }, @Query() query: any) {
    return this.reservasService.findAll(user, query);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateReservaDto,
    @CurrentUser() user: { sub: number; role: Rol },
  ) {
    return this.reservasService.update(Number(id), dto, user);
  }

  @Delete(':id')
  cancel(@Param('id') id: number, @CurrentUser() user: { sub: number; role: Rol }) {
    return this.reservasService.cancel(Number(id), user);
  }
}
