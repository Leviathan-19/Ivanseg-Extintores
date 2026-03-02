import { prisma } from "../lib/prisma";

export const createVisitaService = async (data: any) => {
  return prisma.visita.create({ data });
};

export const getVisitasService = async () => {
  return prisma.visita.findMany({
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
    },
    orderBy: {
      fechaVisita: "desc"
    }
  });
};

export const getVisitaByIdService = async (id: string) => {
  return prisma.visita.findUnique({
    where: { id },
    include: {
      barrio: true
    }
  });
};

export const updateVisitaService = async (id: string, data: any) => {
  return prisma.visita.update({
    where: { id },
    data
  });
};

export const deleteVisitaService = async (id: string) => {
  return prisma.visita.delete({
    where: { id }
  });
};