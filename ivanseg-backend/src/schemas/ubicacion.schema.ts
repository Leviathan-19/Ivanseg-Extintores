import { z } from "zod";

export const createUbicacionSchema = z.object({
  barrioId: z.string().uuid(),
  callePrincipal: z.string().min(1),
  calleSecundaria: z.string().optional(),
  numeracion: z.string().optional(),
  latitud: z.number().optional(),
  longitud: z.number().optional(),
});

export const updateUbicacionSchema =
  createUbicacionSchema.partial();

export type CreateUbicacionInput =
  z.infer<typeof createUbicacionSchema>;

export type UpdateUbicacionInput =
  z.infer<typeof updateUbicacionSchema>;