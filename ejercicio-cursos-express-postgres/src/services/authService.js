import {
  hashearPassword,
  verificarPassword,
} from "../auth/passwords.js";
import { firmarToken } from "../auth/jwt.js";

export class AuthService {
  constructor(usuariosRepository) {
    this.usuariosRepository = usuariosRepository;
  }

  async registrar({ email, password }) {
    const existente = await this.usuariosRepository.buscarPorEmail(email);

    if (existente) {
      const error = new Error("El correo ya está registrado");
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await hashearPassword(password);

    const usuario = await this.usuariosRepository.crear({
      email,
      passwordHash,
    });

    return {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };
  }

  async login({ email, password }) {
    const usuario = await this.usuariosRepository.buscarPorEmail(email);

    if (!usuario) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const passwordCorrecta = await verificarPassword(
      password,
      usuario.passwordHash
    );

    if (!passwordCorrecta) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const token = firmarToken({
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}
