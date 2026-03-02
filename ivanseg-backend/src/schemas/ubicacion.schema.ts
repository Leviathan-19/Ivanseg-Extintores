import { z } from "zod";

export const createUbicacionSchema = z.object({
  barrioId: z.string().uuid(),
  callePrincipal: z.string().min(1),
  calleSecundaria: z.string().optional(),
  numeracion: z.string().optional(),
  latitud: z.number().optional(),
  longitud: z.number().optional(),
});