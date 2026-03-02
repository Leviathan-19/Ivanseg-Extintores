import { Request, Response } from "express";
import * as ubicacionService from "../services/ubicacion.service";

export const createUbicacion = async (req: Request, res: Response) => {
  try {
    const ubicacion = await ubicacionService.createUbicacionService(req.body);
    res.status(201).json(ubicacion);
  } catch {
    res.status(500).json({ message: "Error al crear ubicación" });
  }
};

export const getUbicaciones = async (_req: Request, res: Response) => {
  try {
    const data = await ubicacionService.getUbicacionesService();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error al obtener ubicaciones" });
  }
};