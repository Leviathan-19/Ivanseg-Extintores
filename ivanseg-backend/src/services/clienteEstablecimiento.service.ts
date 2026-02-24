import { prisma } from "../lib/prisma";
import { CreateClienteWithEstablecimientoInput, createClienteWithEstablecimientoSchema } from "../schemas/clienteEstablecimiento.schema";
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