import express from "express";
import clienteRoutes from "./routes/cliente.routes";
import clienteEstablecimientoRoutes from "./routes/clienteEstablecimiento.routes";
import mantenimientoRoutes from "./routes/mantenimiento.routes";
import establecimientoRoutes from "./routes/establecimiento.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/clientes-establecimientos", clienteEstablecimientoRoutes);
app.use("/api/mantenimientos", mantenimientoRoutes);
app.use("/api/establecimientos", establecimientoRoutes);
app.use(errorHandler);

export default app;