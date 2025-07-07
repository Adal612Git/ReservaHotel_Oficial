export enum EstadoHabitacion {
  LIBRE = 'LIBRE',
  OCUPADA = 'OCUPADA',
  MANTENIMIENTO = 'MANTENIMIENTO',
}

export interface Habitacion {
  id: number;
  numero: number;
  estado: EstadoHabitacion;
  precio: number;
}
