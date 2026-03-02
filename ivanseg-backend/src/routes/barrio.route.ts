import { Router } from "express";
import { getBarrios } from "../controllers/barrio.controller";

const router = Router();

router.get("/", getBarrios);

export default router;