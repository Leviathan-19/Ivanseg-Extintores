import express from "express";
import clienteRoutes from "./routes/cliente.routes";
import clienteEstablecimientoRoutes from "./routes/clienteEstablecimiento.routes";
import mantenimientoRoutes from "./routes/mantenimiento.routes";
import establecimientoRoutes from "./routes/establecimiento.routes";
import provinciaRoutes from "./routes/provincia.route";
import cantonRoutes from "./routes/canton.route";
import parroquiaRoutes from "./routes/parroquia.route";
import barrioRoutes from "./routes/barrio.route";
import ubicacionRoutes from "./routes/ubicacion.route";
//import visitaRoutes from "./routes/visita.route";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/api/clientes", clienteRoutes);
app.use("/api/clientes-establecimientos", clienteEstablecimientoRoutes);
app.use("/api/mantenimientos", mantenimientoRoutes);
app.use("/api/establecimientos", establecimientoRoutes);

app.use("/api/provincias", provinciaRoutes);
app.use("/api/cantones", cantonRoutes);
app.use("/api/parroquias", parroquiaRoutes);
app.use("/api/barrios", barrioRoutes);
app.use("/api/ubicaciones", ubicacionRoutes);
//app.use("/api/visitas", visitaRoutes);
app.use(errorHandler);

export default app;