import { z } from "zod";

export const createClienteWithEstablecimientoSchema = z.object({
  nombreCompleto: z.string().min(3),
  telefono: z.string().min(7),
  cedula: z.string().optional(),
  correo: z.string().email().optional(),

  razonSocial: z.string().min(2),
  direccionTexto: z.string().optional(),
  observaciones: z.string().optional(),

  latitud: z.number(),
  longitud: z.number(),
});

export type CreateClienteWithEstablecimientoInput =
  z.infer<typeof createClienteWithEstablecimientoSchema>;