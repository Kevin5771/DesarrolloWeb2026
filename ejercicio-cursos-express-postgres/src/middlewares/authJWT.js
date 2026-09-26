import { verificarToken } from "../auth/jwt.js";

export function authJWT(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token JWT requerido",
    });
  }

  const token = authorization.slice(7);

  try {
    req.usuario = verificarToken(token);
    return next();
  } catch {
    return res.status(401).json({
      error: "Token JWT inválido o expirado",
    });
  }
}
