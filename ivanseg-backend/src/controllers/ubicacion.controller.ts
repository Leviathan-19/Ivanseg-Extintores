import { Request, Response } from "express";
import {
  createUbicacionSchema,
  updateUbicacionSchema,
} from "../schemas/ubicacion.schema";
import * as ubicacionService from "../services/ubicacion.service";

interface UbicacionParams {
  id: string;
}
export const createUbicacionController = async (
  req: Request<{}, {}, any>,
  res: Response
) => {
  try {
    const data = createUbicacionSchema.parse(req.body);

    const ubicacion =
      await ubicacionService.createUbicacionService(data);

    return res.status(201).json(ubicacion);
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear ubicación",
      error,
    });
  }
};
export const getUbicacionesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const data = await ubicacionService.getUbicacionesService();
    return res.json(data);
  } catch {
    return res.status(500).json({
      message: "Error al obtener ubicaciones",
    });
  }
};
export const getUbicacionByIdController = async (
  req: Request<UbicacionParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const ubicacion =
      await ubicacionService.getUbicacionByIdService(id);

    if (!ubicacion) {
      return res.status(404).json({
        message: "Ubicación no encontrada",
      });
    }

    return res.json(ubicacion);
  } catch {
    return res.status(400).json({
      message: "Error al obtener ubicación",
    });
  }
};
export const updateUbicacionController = async (
  req: Request<UbicacionParams>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = updateUbicacionSchema.parse(req.body);

    const updated =
      await ubicacionService.updateUbicacionService(id, data);

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar ubicación",
      error,
    });
  }
};
export const deleteUbicacionController = async (
  req: Request<UbicacionParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const ubicacion =
      await ubicacionService.getUbicacionByIdService(id);

    if (!ubicacion) {
      return res.status(404).json({
        message: "Ubicación no encontrada",
      });
    }

    await ubicacionService.deleteUbicacionService(id);

    return res.json({
      message: "Ubicación eliminada correctamente",
    });
  } catch {
    return res.status(400).json({
      message: "Error al eliminar ubicación",
    });
  }
};
