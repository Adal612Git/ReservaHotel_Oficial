import { Habitacion } from './habitacion.entity';

export interface CreateHabitacionUseCase {
  create(data: Omit<Habitacion, 'id'>): Promise<Habitacion>;
}
