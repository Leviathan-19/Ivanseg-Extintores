import { Router } from "express";
import {
  createMantenimientoController,
  getMantenimientosController,
  getMantenimientoByIdController,
  updateMantenimientoController,
  deleteMantenimientoController,
} from "../controllers/mantenimiento.controller";

const router = Router({ mergeParams: true });

router.post("/", createMantenimientoController);
router.get("/", getMantenimientosController);
router.get("/:id", getMantenimientoByIdController);
router.put("/:id", updateMantenimientoController);
router.delete("/:id", deleteMantenimientoController);

export default router;