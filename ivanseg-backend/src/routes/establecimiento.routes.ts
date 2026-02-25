import { Router } from "express";
import {
  createEstablecimientoController,
  getEstablecimientosByClienteController,
  getEstablecimientoByIdController,
  updateEstablecimientoController,
  deleteEstablecimientoController,
} from "../controllers/establecimiento.controller";
import mantenimientoRoutes from "./mantenimiento.routes";

const router = Router({ mergeParams: true });

// CREATE
router.post("/", createEstablecimientoController);

// GET ALL
router.get("/", getEstablecimientosByClienteController);

// GET BY ID
router.get("/:establecimientoId", getEstablecimientoByIdController);

// UPDATE
router.put("/:establecimientoId", updateEstablecimientoController);

// DELETE
router.delete("/:establecimientoId", deleteEstablecimientoController);

// Nested mantenimientos
router.use("/:establecimientoId/mantenimientos", mantenimientoRoutes);

export default router;