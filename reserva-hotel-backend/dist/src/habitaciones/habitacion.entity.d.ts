import { EstadoHabitacion } from './estado-habitacion.enum';
export interface Habitacion {
    id: number;
    numero: number;
    estado: EstadoHabitacion;
    precio: number;
}
