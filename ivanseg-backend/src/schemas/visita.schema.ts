import { z } from "zod";

export const createVisitaSchema = z.object({
  nombreCliente: z.string().optional(),
  razonSocial: z.string().min(2),
  telefono: z.string().optional(),
  correo: z.string().email().optional(),
  estadoVisita: z.string().optional(),
  proximaVisita: z.coerce.date(),
  ubicacionId: z.string().uuid(),
});

export const updateVisitaSchema =
  createVisitaSchema.partial();

export type CreateVisitaInput =
  z.infer<typeof createVisitaSchema>;

export type UpdateVisitaInput =
  z.infer<typeof updateVisitaSchema>;