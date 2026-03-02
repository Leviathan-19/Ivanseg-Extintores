import { Router } from "express";
import { getParroquias } from "../controllers/parroquia.controller";

const router = Router();

router.get("/", getParroquias);

export default router;