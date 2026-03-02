import { Router } from "express";
import * as ubicacionController from "../controllers/ubicacion.controller";

const router = Router();

router.post("/", ubicacionController.createUbicacionController);
router.get("/", ubicacionController.getUbicacionesController);
router.get("/:id", ubicacionController.getUbicacionByIdController);
router.put("/:id", ubicacionController.updateUbicacionController);
router.delete("/:id", ubicacionController.deleteUbicacionController);

export default router;