import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashearPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verificarPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}
