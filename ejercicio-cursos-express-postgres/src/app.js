import express from "express";
import { sessionMiddleware } from "./config/session.js";
import { SequelizeCursosRepository } from "./repositories/SequelizeCursosRepository.js";
import { SequelizeUsuariosRepository } from "./repositories/SequelizeUsuariosRepository.js";
import { AuthService } from "./services/authService.js";
import { crearCursosRouter } from "./routes/cursos.routes.js";
import { crearAuthRouter } from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const cursosRepository = new SequelizeCursosRepository();
const usuariosRepository = new SequelizeUsuariosRepository();
const authService = new AuthService(usuariosRepository);

export const app = express();

app.use(express.json());
app.use(sessionMiddleware);

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    message: "API funcionando",
  });
});

app.use("/auth", crearAuthRouter(authService));
app.use("/cursos", crearCursosRouter(cursosRepository));

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.use(errorHandler);
