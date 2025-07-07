import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { Habitacion } from '@prisma/client';
import { HabitacionesService } from './habitaciones.service';
export declare class HabitacionesController {
    private readonly habitacionesService;
    constructor(habitacionesService: HabitacionesService);
    findAll(): Promise<Habitacion[]>;
    create(dto: CreateHabitacionDto): Promise<Habitacion>;
}
