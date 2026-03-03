import { z } from "zod";

export const createVisitaSchema = z.object({
  barrioId: z.string().uuid(),

  nombreCliente: z.string().nullable().optional(),
  razonSocial: z.string().min(2),

  telefono: z.string().nullable().optional(),
  correo: z.string().email().nullable().optional(),

  callePrincipal: z.string().min(1),
  calleSecundaria: z.string().nullable().optional(),
  numeracion: z.string().nullable().optional(),

  latitud: z.number().nullable().optional(),
  longitud: z.number().nullable().optional(),

  estadoVisita: z.string().nullable().optional(),

  proximaVisita: z.coerce.date(),
});

export const updateVisitaSchema = createVisitaSchema.partial();

export type CreateVisitaInput = z.infer<typeof createVisitaSchema>;

export type UpdateVisitaInput = z.infer<typeof updateVisitaSchema>;
