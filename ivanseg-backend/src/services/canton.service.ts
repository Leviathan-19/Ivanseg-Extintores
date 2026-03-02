import { prisma } from "../lib/prisma";

export const getCantonesByProvinciaService = async (provinciaId: string) => {
  return prisma.canton.findMany({
    where: { provinciaId },
    orderBy: { nombre: "asc" }
  });
};