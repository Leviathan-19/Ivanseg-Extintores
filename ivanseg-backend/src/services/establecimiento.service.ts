import { prisma } from "../lib/prisma";
import {
  CreateEstablecimientoInput,
  UpdateEstablecimientoInput,
} from "../schemas/establecimiento.schema";

//Crear establecimiento

export const createEstablecimientoService = async (
  clienteId: string,
  data: CreateEstablecimientoInput
) => {
  return await prisma.establecimiento.create({
    data: {
      ...data,
      clienteId,
    },
  });
};

// Listar establecimientos por cliente

export const getEstablecimientosByClienteService = async (
  clienteId: string
) => {
  return await prisma.establecimiento.findMany({
    where: {
      clienteId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Obtener establecimiento por ID
export const getEstablecimientoByIdService = async (
  establecimientoId: string
) => {
  return await prisma.establecimiento.findUnique({
    where: {
      id: establecimientoId,
    },
    include: {
      cliente: true,
    },
  });
};
// Actualizar establecimiento
export const updateEstablecimientoService = async (
  establecimientoId: string,
  data: UpdateEstablecimientoInput
) => {
  return await prisma.establecimiento.update({
    where: {
      id: establecimientoId,
    },
    data,
  });
};

// Eliminar establecimiento

export const deleteEstablecimientoService = async (
  establecimientoId: string
) => {
  return await prisma.establecimiento.delete({
    where: {
      id: establecimientoId,
    },
  });
};