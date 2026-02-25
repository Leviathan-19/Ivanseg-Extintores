import { Router } from "express";
import {
  createClienteEstablecimientoController,
  getAllClientesEstablecimientosController,
  getClienteEstablecimientoByIdController,
  updateClienteEstablecimientoController,
  deleteClienteEstablecimientoController,
} from "../controllers/clienteEstablecimiento.controller";
import mantenimientoRoutes from "./mantenimiento.routes";
const router = Router();

// CREATE
router.post("/", createClienteEstablecimientoController);
// GET ALL
router.get("/", getAllClientesEstablecimientosController);
// GET BY ID
router.get("/:id", getClienteEstablecimientoByIdController);
// UPDATE
router.put("/:clienteId/:establecimientoId", updateClienteEstablecimientoController);
// DELETE
router.delete("/:id", deleteClienteEstablecimientoController);

router.use("/:establecimientoId/mantenimientos", mantenimientoRoutes);

export default router;