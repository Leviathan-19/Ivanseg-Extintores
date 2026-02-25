import { z } from "zod";

export const createEstablecimientoSchema = z.object({
  razonSocial: z.string().min(2),
  direccionTexto: z.string().optional(),
  observaciones: z.string().optional(),
  latitud: z.number(),
  longitud: z.number(),
});

export const updateEstablecimientoSchema =
  createEstablecimientoSchema.partial();

export type CreateEstablecimientoInput =
  z.infer<typeof createEstablecimientoSchema>;

export type UpdateEstablecimientoInput =
  z.infer<typeof updateEstablecimientoSchema>;