import { Router } from "express";
import * as visitaController from "../controllers/visita.controller";

const router = Router();

router.post("/", visitaController.createVisita);
router.get("/", visitaController.getVisitas);

export default router;