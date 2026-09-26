import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function firmarToken(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verificarToken(token) {
  return jwt.verify(token, config.jwtSecret);
}
