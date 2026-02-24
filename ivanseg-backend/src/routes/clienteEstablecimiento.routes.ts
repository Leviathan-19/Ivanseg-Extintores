import { Router } from "express";
import { createClienteWithEstablecimientoController } from "../controllers/clienteEstablecimiento.controller";

const router = Router();

router.post("/", createClienteWithEstablecimientoController);

export default router;