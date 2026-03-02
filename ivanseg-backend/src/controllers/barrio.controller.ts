import { Request, Response } from "express";
import { getBarriosByParroquiaService } from "../services/barrio.service";

export const getBarrios = async (req: Request, res: Response) => {
  try {
    const { parroquiaId } = req.query;
    const barrios = await getBarriosByParroquiaService(parroquiaId as string);
    res.json(barrios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener barrios" });
  }
};