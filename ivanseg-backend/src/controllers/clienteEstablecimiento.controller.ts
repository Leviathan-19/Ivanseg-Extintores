import { Request, Response, NextFunction } from "express";
import {
  createClienteWithEstablecimiento,
  getAllClientesWithEstablecimientos,
  getClienteWithEstablecimientosById,
  updateClienteWithEstablecimiento,
  deleteClienteWithEstablecimientos,
} from "../services/clienteEstablecimiento.service";
import { createClienteWithEstablecimientoSchema } from "../schemas/clienteEstablecimiento.schema";

// CREATE
export const createClienteEstablecimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createClienteWithEstablecimientoSchema.parse(
      req.body,
    );
    const result = await createClienteWithEstablecimiento(validatedData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllClientesEstablecimientosController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllClientesWithEstablecimientos();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// GET BY ID
export const getClienteEstablecimientoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const result = await getClienteWithEstablecimientosById(id);

    if (!result) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// UPDATE
export const updateClienteEstablecimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const clienteId = req.params.clienteId as string;
    const establecimientoId = req.params.establecimientoId as string;

    const validatedData = createClienteWithEstablecimientoSchema.parse(
      req.body,
    );

    const result = await updateClienteWithEstablecimiento(
      clienteId,
      establecimientoId,
      validatedData,
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteClienteEstablecimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    await deleteClienteWithEstablecimientos(id);

    res.json({
      message: "Cliente y establecimientos eliminados correctamente",
    });
  } catch (error) {
    next(error);
  }
};
