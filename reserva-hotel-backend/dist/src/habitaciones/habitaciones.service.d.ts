import { PrismaService } from '../prisma/prisma.service';
import { CreateHabitacionDto } from './dto/create-habitacion.dto';
import { Habitacion } from '@prisma/client';
export declare class HabitacionesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Habitacion[]>;
    create(dto: CreateHabitacionDto): Promise<Habitacion>;
}
