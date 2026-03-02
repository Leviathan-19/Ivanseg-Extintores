import { Request, Response } from "express";
import { getProvinciasService } from "../services/provincia.service";

export const getProvincias = async (req: Request, res: Response) => {
  try {
    const provincias = await getProvinciasService();
    res.json(provincias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener provincias" });
  }
};