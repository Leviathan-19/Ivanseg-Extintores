import { Router } from "express";
import { getCantones } from "../controllers/canton.controller";

const router = Router();

router.get("/", getCantones);

export default router;