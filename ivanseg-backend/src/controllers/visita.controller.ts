import { Request, Response } from "express";
import {
  createVisitaSchema,
  updateVisitaSchema,
} from "../schemas/visita.schema";
import * as visitaService from "../services/visita.service";

interface VisitaParams {
  id: string;
}
export const createVisitaController = async (
  req: Request<{}, {}, any>,
  res: Response,
) => {
  try {
    const data = createVisitaSchema.parse(req.body);

    const visita = await visitaService.createVisitaService(data);

    return res.status(201).json(visita);
  } catch (error) {
    console.error(" ERROR REAL PRISMA:", error);
    res.status(400).json(error);
  }
};
export const getVisitasController = async (_req: Request, res: Response) => {
  try {
    const visitas = await visitaService.getVisitasService();
    return res.json(visitas);
  } catch {
    return res.status(500).json({
      message: "Error al obtener visitas",
    });
  }
};
export const getVisitaByIdController = async (
  req: Request<VisitaParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const visita = await visitaService.getVisitaByIdService(id);

    if (!visita) {
      return res.status(404).json({
        message: "Visita no encontrada",
      });
    }

    return res.json(visita);
  } catch {
    return res.status(400).json({
      message: "Error al obtener visita",
    });
  }
};
export const updateVisitaController = async (
  req: Request<VisitaParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const data = updateVisitaSchema.parse(req.body);

    const updated = await visitaService.updateVisitaService(id, data);

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar visita",
      error,
    });
  }
};
export const deleteVisitaController = async (
  req: Request<VisitaParams>,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const visita = await visitaService.getVisitaByIdService(id);

    if (!visita) {
      return res.status(404).json({
        message: "Visita no encontrada",
      });
    }

    await visitaService.deleteVisitaService(id);

    return res.json({
      message: "Visita eliminada correctamente",
    });
  } catch {
    return res.status(400).json({
      message: "Error al eliminar visita",
    });
  }
};
