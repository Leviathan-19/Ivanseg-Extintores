import { prisma } from "../lib/prisma";

export const getBarriosByParroquiaService = async (parroquiaId: string) => {
  return prisma.barrio.findMany({
    where: { parroquiaId },
    orderBy: { nombre: "asc" }
  });
};