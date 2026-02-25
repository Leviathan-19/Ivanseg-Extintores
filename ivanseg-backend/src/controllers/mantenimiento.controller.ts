import { Request, Response, NextFunction } from "express";
import {
  createMantenimiento,
  getMantenimientosByEstablecimiento,
  getMantenimientoById,
  updateMantenimiento,
  deleteMantenimiento,
} from "../services/mantenimiento.service";

export const createMantenimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const establecimientoId = req.params.establecimientoId as string;

    const result = await createMantenimiento(establecimientoId, {
      fechaProximoMantenimiento: new Date(
        req.body.fechaProximoMantenimiento
      ),
      estado: req.body.estado,
      competenciaActual: req.body.competenciaActual,
      observaciones: req.body.observaciones,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMantenimientosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const establecimientoId = req.params.establecimientoId as string;

    const result = await getMantenimientosByEstablecimiento(
      establecimientoId
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getMantenimientoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const establecimientoId = req.params.establecimientoId as string;
    const id = req.params.id as string;

    const result = await getMantenimientoById(
      establecimientoId,
      id
    );

    if (!result) {
      return res.status(404).json({
        message: "Mantenimiento no encontrado",
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateMantenimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const establecimientoId = req.params.establecimientoId as string;
    const id = req.params.id as string;

    const result = await updateMantenimiento(
      establecimientoId,
      id,
      {
        fechaProximoMantenimiento: req.body.fechaProximoMantenimiento
          ? new Date(req.body.fechaProximoMantenimiento)
          : undefined,
        estado: req.body.estado,
        competenciaActual: req.body.competenciaActual,
        observaciones: req.body.observaciones,
      }
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteMantenimientoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const establecimientoId = req.params.establecimientoId as string;
    const id = req.params.id as string;

    await deleteMantenimiento(establecimientoId, id);

    res.json({
      message: "Mantenimiento eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};