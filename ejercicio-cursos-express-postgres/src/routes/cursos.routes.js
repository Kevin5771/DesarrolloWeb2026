import { Router } from "express";
import { authJWT } from "../middlewares/authJWT.js";
import { validarErrores } from "../middlewares/validarErrores.js";
import { validarCurso } from "../validators/cursoValidator.js";
import { registrarCreacionCurso } from "../services/logService.js";

export function crearCursosRouter(cursosRepository) {
  const router = Router();

  router.get("/", async (req, res, next) => {
    try {
      const cursos = await cursosRepository.listar();
      return res.json(cursos);
    } catch (error) {
      return next(error);
    }
  });

  router.post(
    "/",
    authJWT,
    validarCurso,
    validarErrores,
    async (req, res, next) => {
      try {
        const curso = await cursosRepository.crear({
          nombre: req.body.nombre,
          codigo: req.body.codigo,
          creditos: req.body.creditos,
        });

        // Fire-and-forget: no se espera el log, pero sí se captura su error.
        void registrarCreacionCurso(curso, req.usuario.sub).catch((error) => {
          console.error("No se pudo escribir el log del curso:", error.message);
        });

        return res.status(201).json(curso);
      } catch (error) {
        return next(error);
      }
    }
  );

  return router;
}
