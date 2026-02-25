import { Request, Response } from "express";
import {
  createEstablecimientoSchema,
  updateEstablecimientoSchema,
} from "../schemas/establecimiento.schema";
import {
  createEstablecimientoService,
  getEstablecimientosByClienteService,
  getEstablecimientoByIdService,
  updateEstablecimientoService,
  deleteEstablecimientoService,
} from "../services/establecimiento.service";

interface EstablecimientoParams {
  clienteId: string;
  establecimientoId: string;
}

// CREATE
export const createEstablecimientoController = async (
  req: Request<EstablecimientoParams>,
  res: Response
) => {
  try {
    const clienteId = req.params.clienteId;
    const data = createEstablecimientoSchema.parse(req.body);

    const establecimiento = await createEstablecimientoService(
      clienteId,
      data
    );

    return res.status(201).json(establecimiento);
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear establecimiento",
      error,
    });
  }
};
// GET ALL
export const getEstablecimientosByClienteController = async (
  req: Request<{ clienteId: string }>,
  res: Response
) => {
  try {
    const { clienteId } = req.params;

    const establecimientos =
      await getEstablecimientosByClienteService(clienteId);

    return res.json(establecimientos);
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener establecimientos",
    });
  }
};
// GET BY ID
export const getEstablecimientoByIdController = async (
  req: Request<EstablecimientoParams>,
  res: Response
) => {
  try {
    const { clienteId, establecimientoId } = req.params;

    const establecimiento =
      await getEstablecimientoByIdService(establecimientoId);

    if (!establecimiento || establecimiento.clienteId !== clienteId) {
      return res.status(404).json({
        message: "Establecimiento no encontrado",
      });
    }

    return res.json(establecimiento);
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener establecimiento",
    });
  }
};
// UPDATE
export const updateEstablecimientoController = async (
  req: Request<EstablecimientoParams>,
  res: Response
) => {
  try {
    const { clienteId, establecimientoId } = req.params;
    const data = updateEstablecimientoSchema.parse(req.body);

    const updated = await updateEstablecimientoService(
      establecimientoId,
      data
    );

    if (!updated || updated.clienteId !== clienteId) {
      return res.status(404).json({
        message: "No encontrado o no pertenece al cliente",
      });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar establecimiento",
    });
  }
};
// DELETE
export const deleteEstablecimientoController = async (
  req: Request<EstablecimientoParams>,
  res: Response
) => {
  try {
    const { clienteId, establecimientoId } = req.params;

    const establecimiento =
      await getEstablecimientoByIdService(establecimientoId);

    if (!establecimiento || establecimiento.clienteId !== clienteId) {
      return res.status(404).json({
        message: "No encontrado o no pertenece al cliente",
      });
    }

    await deleteEstablecimientoService(establecimientoId);

    return res.json({
      message: "Establecimiento eliminado correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al eliminar establecimiento",
    });
  }
};