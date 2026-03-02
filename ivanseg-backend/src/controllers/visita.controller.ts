import { Request, Response } from "express";
import * as visitaService from "../services/visita.service";

export const createVisita = async (req: Request, res: Response) => {
  try {
    const visita = await visitaService.createVisitaService(req.body);
    res.status(201).json(visita);
  } catch {
    res.status(500).json({ message: "Error al crear visita" });
  }
};

export const getVisitas = async (_req: Request, res: Response) => {
  try {
    const visitas = await visitaService.getVisitasService();
    res.json(visitas);
  } catch {
    res.status(500).json({ message: "Error al obtener visitas" });
  }
};