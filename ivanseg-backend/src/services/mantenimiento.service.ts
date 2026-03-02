import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

// Crear mantenimiento
export const createMantenimiento = async (
  establecimientoId: string,
  data: {
    fechaProximoMantenimiento: Date;
    estado?: "pendiente" | "completado" | "vencido";
    competenciaActual?: string;
    observaciones?: string;
  }
) => {
  // Validar existencia del establecimiento
  const establecimiento = await prisma.establecimiento.findUnique({
    where: { id: establecimientoId },
  });

  if (!establecimiento) {
    throw new Error("El establecimiento no existe");
  }

  return await prisma.mantenimientoGeneral.create({
    data: {
      establecimientoId,
      fechaProximoMantenimiento: data.fechaProximoMantenimiento,
      estado: data.estado, // si no se envía, Prisma usa default
      competenciaActual: data.competenciaActual,
      observaciones: data.observaciones,
    },
  });
};

// Listar mantenimientos por establecimiento
export const getMantenimientosByEstablecimiento = async (
  establecimientoId: string
) => {
  return await prisma.mantenimientoGeneral.findMany({
    where: { establecimientoId },
    orderBy: { fechaProximoMantenimiento: "desc" },
  });
};

// Obtener uno específico
export const getMantenimientoById = async (
  establecimientoId: string,
  id: string
) => {
  return await prisma.mantenimientoGeneral.findFirst({
    where: {
      id,
      establecimientoId,
    },
  });
};

// Actualizar mantenimiento
export const updateMantenimiento = async (
  establecimientoId: string,
  id: string,
  data: any
) => {
  const mantenimiento = await prisma.mantenimientoGeneral.findFirst({
    where: {
      id,
      establecimientoId,
    },
  });

  if (!mantenimiento) {
    throw new Error("Mantenimiento no encontrado");
  }

  return await prisma.mantenimientoGeneral.update({
    where: { id },
    data,
  });
};

// Eliminar mantenimiento
export const deleteMantenimiento = async (
  establecimientoId: string,
  id: string
) => {
  return await prisma.mantenimientoGeneral.deleteMany({
    where: {
      id,
      establecimientoId,
    },
  });
};