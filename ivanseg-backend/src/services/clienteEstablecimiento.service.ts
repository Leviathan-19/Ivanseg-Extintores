import { prisma } from "../lib/prisma";
import { CreateClienteWithEstablecimientoInput, createClienteWithEstablecimientoSchema } from "../schemas/clienteEstablecimiento.schema";

// Servicio para crear un cliente junto con su establecimiento
export const createClienteWithEstablecimiento = async (
  data: CreateClienteWithEstablecimientoInput
) => {
  return await prisma.cliente.create({
    data: {
      nombreCompleto: data.nombreCompleto,
      telefono: data.telefono,
      cedula: data.cedula,
      correo: data.correo,

      establecimientos: {
        create: {
          razonSocial: data.razonSocial,
          direccionTexto: data.direccionTexto,
          observaciones: data.observaciones,
          latitud: data.latitud,
          longitud: data.longitud,
        },
      },
    },
    include: {
      establecimientos: true,
    },
  });
};
// Servicio para obtener todos los clientes con sus establecimientos
export const getAllClientesWithEstablecimientos = async () => {
  return await prisma.cliente.findMany({
    include: {
      establecimientos: true,
    },
  });
};
// Servicio para obtener un cliente por su ID junto con sus establecimientos
export const getClienteWithEstablecimientosById = async (id: string) => {
  return await prisma.cliente.findUnique({
    where: { id },
    include: {
      establecimientos: true,
    },
  });
};
// Servicio para actualizar un cliente y su establecimiento
export const updateClienteWithEstablecimiento = async (
  clienteId: string,
  establecimientoId: string,
  data: any
) => {
  return await prisma.$transaction([
    prisma.cliente.update({
      where: { id: clienteId },
      data: {
        nombreCompleto: data.nombreCompleto,
        telefono: data.telefono,
      },
    }),
    prisma.establecimiento.update({
      where: { id: establecimientoId },
      data: {
        razonSocial: data.razonSocial,
        latitud: data.latitud,
        longitud: data.longitud,
      },
    }),
  ]);
};
// Servicio para eliminar un cliente junto con sus establecimientos
export const deleteClienteWithEstablecimientos = async (id: string) => {
  return await prisma.cliente.delete({
    where: { id },
  });
};