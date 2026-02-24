import { Request, Response, NextFunction } from "express";
import { createClienteWithEstablecimiento } from "../services/clienteEstablecimiento.service";
import { createClienteWithEstablecimientoSchema } from "../schemas/clienteEstablecimiento.schema";

export const createClienteWithEstablecimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = createClienteWithEstablecimientoSchema.parse(req.body);

    const result = await createClienteWithEstablecimiento(validatedData);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};