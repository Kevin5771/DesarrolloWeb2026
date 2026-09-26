import { body } from "express-validator";

export const validarCurso = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 120 })
    .withMessage("El nombre es demasiado largo"),

  body("codigo")
    .trim()
    .notEmpty()
    .withMessage("El código es obligatorio")
    .isLength({ max: 30 })
    .withMessage("El código es demasiado largo"),

  body("creditos")
    .notEmpty()
    .withMessage("Los créditos son obligatorios")
    .isInt({ min: 1, max: 50 })
    .withMessage("Los créditos deben ser un entero mayor que 0")
    .toInt(),
];
