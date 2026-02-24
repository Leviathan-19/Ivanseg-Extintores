import { prisma } from "../lib/prisma";

export const createClienteService = async (data: any) => {
  return prisma.cliente.create({ data });
};

export const getClientesService = async () => {
  return prisma.cliente.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getClienteByIdService = async (id: string) => {
  return prisma.cliente.findUnique({
    where: { id },
    include: {
      establecimientos: true,
    },
  });
};

export const updateClienteService = async (id: string, data: any) => {
  return prisma.cliente.update({
    where: { id },
    data,
  });
};

export const deleteClienteService = async (id: string) => {
  return prisma.cliente.delete({
    where: { id },
  });
};