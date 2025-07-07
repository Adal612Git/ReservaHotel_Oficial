-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'RECEPCIONISTA', 'CLIENTE');

-- CreateEnum
CREATE TYPE "EstadoHabitacion" AS ENUM ('LIBRE', 'OCUPADA', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "EstadoReserva" AS ENUM ('ACTIVA', 'CANCELADA', 'COMPLETADA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitacion" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado" "EstadoHabitacion" NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Habitacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "habitacionId" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoReserva" NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Habitacion_numero_key" ON "Habitacion"("numero");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_habitacionId_fkey" FOREIGN KEY ("habitacionId") REFERENCES "Habitacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
