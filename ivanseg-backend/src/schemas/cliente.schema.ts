import { z } from "zod";

export const createClienteSchema = z.object({
  nombreCompleto: z.string().min(3),
  telefono: z.string().min(7),
  cedula: z.string().optional(),
  correo: z.string().email().optional(),
});

export const updateClienteSchema = createClienteSchema.partial();