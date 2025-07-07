import { Habitacion } from './habitacion.entity';

export interface ListHabitacionesUseCase {
  findAll(): Promise<Habitacion[]>;
}
