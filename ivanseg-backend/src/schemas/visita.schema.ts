import { z } from "zod";

export const createVisitaSchema = z.object({
  barrioId: z.string().uuid(),

  nombreCliente: z.string().optional(),
  razonSocial: z.string().min(2),

  telefono: z.string().optional(),
  correo: z.string().email().optional(),

  callePrincipal: z.string().min(1),
  calleSecundaria: z.string().optional(),
  numeracion: z.string().optional(),

  latitud: z.number().optional(),
  longitud: z.number().optional(),

  estadoVisita: z.string().optional(),

  proximaVisita: z.coerce.date(),
});

export const updateVisitaSchema =
  createVisitaSchema.partial();

export type CreateVisitaInput =
  z.infer<typeof createVisitaSchema>;

export type UpdateVisitaInput =
  z.infer<typeof updateVisitaSchema>;