import { Router } from "express";
import * as ubicacionController from "../controllers/ubicacion.controller";

const router = Router();

router.post("/", ubicacionController.createUbicacion);
router.get("/", ubicacionController.getUbicaciones);

export default router;