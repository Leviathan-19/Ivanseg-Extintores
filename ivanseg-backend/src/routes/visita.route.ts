import { Router } from "express";
import * as visitaController from "../controllers/visita.controller";

const router = Router();

router.post("/", visitaController.createVisitaController);
router.get("/", visitaController.getVisitasController);
router.get("/:id", visitaController.getVisitaByIdController);
router.put("/:id", visitaController.updateVisitaController);
router.delete("/:id", visitaController.deleteVisitaController);

export default router;