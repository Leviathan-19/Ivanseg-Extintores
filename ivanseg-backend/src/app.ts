import express from "express";
import clienteRoutes from "./routes/cliente.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/clientes", clienteRoutes);

app.use(errorHandler);

export default app;