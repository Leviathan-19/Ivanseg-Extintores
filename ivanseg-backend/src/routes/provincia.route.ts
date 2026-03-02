import { Router } from "express";
import { getProvincias } from "../controllers/provincia.controller";

const router = Router();

router.get("/", getProvincias);

export default router;