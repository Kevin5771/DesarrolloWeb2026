import { Router } from "express";
import { validarErrores } from "../middlewares/validarErrores.js";
import {
  validarLogin,
  validarRegistro,
} from "../validators/authValidator.js";

export function crearAuthRouter(authService) {
  const router = Router();

  router.post(
    "/register",
    validarRegistro,
    validarErrores,
    async (req, res, next) => {
      try {
        const usuario = await authService.registrar({
          email: req.body.email,
          password: req.body.password,
        });

        return res.status(201).json({
          message: "Usuario registrado correctamente",
          usuario,
        });
      } catch (error) {
        if (error.statusCode) {
          return res.status(error.statusCode).json({
            error: error.message,
          });
        }

        return next(error);
      }
    }
  );

  router.post(
    "/login",
    validarLogin,
    validarErrores,
    async (req, res, next) => {
      try {
        const resultado = await authService.login({
          email: req.body.email,
          password: req.body.password,
        });

        req.session.usuarioId = resultado.usuario.id;
        req.session.email = resultado.usuario.email;

        return res.json({
          message: "Inicio de sesión correcto",
          token: resultado.token,
        });
      } catch (error) {
        if (error.statusCode) {
          return res.status(error.statusCode).json({
            error: error.message,
          });
        }

        return next(error);
      }
    }
  );

  router.get("/session", (req, res) => {
    if (!req.session.usuarioId) {
      return res.status(401).json({
        autenticado: false,
        message: "No hay sesión activa",
      });
    }

    return res.json({
      autenticado: true,
      usuarioId: req.session.usuarioId,
      email: req.session.email,
    });
  });

  router.post("/logout", (req, res, next) => {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");
      return res.status(204).send();
    });
  });

  return router;
}
