import { IUsuariosRepository } from "./IUsuariosRepository.js";
import { Usuario } from "../models/Usuario.js";

export class SequelizeUsuariosRepository extends IUsuariosRepository {
  async buscarPorEmail(email) {
    return Usuario.findOne({
      where: { email },
    });
  }

  async crear(datos) {
    return Usuario.create(datos);
  }
}
