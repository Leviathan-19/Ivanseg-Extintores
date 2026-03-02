import { prisma } from "../lib/prisma";

export const createUbicacionService = async (data: any) => {
  return prisma.ubicacion.create({ data });
};

export const getUbicacionesService = async () => {
  return prisma.ubicacion.findMany({
    include: {
      barrio: {
        include: {
          parroquia: {
            include: {
              canton: {
                include: {
                  provincia: true
                }
              }
            }
          }
        }
      }
    }
  });
};

export const getUbicacionByIdService = async (id: string) => {
  return prisma.ubicacion.findUnique({
    where: { id }
  });
};

export const updateUbicacionService = async (id: string, data: any) => {
  return prisma.ubicacion.update({
    where: { id },
    data
  });
};

export const deleteUbicacionService = async (id: string) => {
  return prisma.ubicacion.delete({
    where: { id }
  });
};