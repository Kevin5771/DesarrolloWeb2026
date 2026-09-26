import { ICursosRepository } from "./ICursosRepository.js";
import { Curso } from "../models/Curso.js";

export class SequelizeCursosRepository extends ICursosRepository {
  async listar() {
    return Curso.findAll({
      order: [["id", "ASC"]],
    });
  }

  async obtener(id) {
    return Curso.findByPk(id);
  }

  async crear(datos) {
    return Curso.create(datos);
  }

  async actualizar(id, cambios) {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return null;
    }

    return curso.update(cambios);
  }

  async eliminar(id) {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return false;
    }

    await curso.destroy();
    return true;
  }
}
