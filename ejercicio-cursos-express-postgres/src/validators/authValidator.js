import { body } from "express-validator";

export const validarRegistro = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Debe ingresar un correo válido")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const validarLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Debe ingresar un correo válido")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
];
