import { Request, Response } from "express";
interface ClienteParams {
  id: string;
}
import {
  createClienteService,
  getClientesService,
  getClienteByIdService,
  updateClienteService,
  deleteClienteService,
} from "../services/cliente.service";
import {
  createClienteSchema,
  updateClienteSchema,
} from "../schemas/cliente.schema";

export const createCliente = async (req: Request, res: Response) => {
  const parsed = createClienteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  const cliente = await createClienteService(parsed.data);
  res.status(201).json(cliente);
};

export const getClientes = async (_req: Request, res: Response) => {
  const clientes = await getClientesService();
  res.json(clientes);
};

export const getClienteById = async (
  req: Request<ClienteParams>,
  res: Response
) => {
  const cliente = await getClienteByIdService(req.params.id);

  if (!cliente) {
    return res.status(404).json({ message: "Cliente not found" });
  }

  res.json(cliente);
};

export const updateCliente = async (
  req: Request<ClienteParams>,
  res: Response
) => {
  const parsed = updateClienteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }

  const cliente = await updateClienteService(req.params.id, parsed.data);
  res.json(cliente);
};

export const deleteCliente = async (req: Request<ClienteParams>, res: Response) => {
  await deleteClienteService(req.params.id);
  res.status(204).send();
};