import { Request, Response } from "express";
import { getParroquiasByCantonService } from "../services/parroquia.service";

export const getParroquias = async (req: Request, res: Response) => {
  try {
    const { cantonId } = req.query;
    const parroquias = await getParroquiasByCantonService(cantonId as string);
    res.json(parroquias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener parroquias" });
  }
};