import { prisma } from "../lib/prisma";

export const getParroquiasByCantonService = async (cantonId: string) => {
  return prisma.parroquia.findMany({
    where: { cantonId },
    orderBy: { nombre: "asc" }
  });
};