import { prisma } from "../lib/prisma";

export const getProvinciasService = async () => {
  return prisma.provincia.findMany({
    orderBy: { nombre: "asc" }
  });
};