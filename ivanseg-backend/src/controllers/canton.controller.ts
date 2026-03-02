import { Request, Response } from "express";
import { getCantonesByProvinciaService } from "../services/canton.service";

export const getCantones = async (req: Request, res: Response) => {
  try {
    const { provinciaId } = req.query;
    const cantones = await getCantonesByProvinciaService(provinciaId as string);
    res.json(cantones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cantones" });
  }
};