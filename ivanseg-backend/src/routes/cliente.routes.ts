import { Router } from "express";
import {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controller";

const router = Router();

router.post("/", createCliente);
router.get("/", getClientes);
router.get("/:id", getClienteById);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;