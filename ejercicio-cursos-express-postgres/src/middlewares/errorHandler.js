export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err?.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Ya existe un registro con ese valor único",
    });
  }

  if (err?.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.errors?.map((e) => e.message) || [],
    });
  }

  return res.status(500).json({
    error: "Error interno del servidor",
  });
}
