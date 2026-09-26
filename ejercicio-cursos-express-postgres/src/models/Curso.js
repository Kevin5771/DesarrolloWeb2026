import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Curso = sequelize.define(
  "Curso",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    creditos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    tableName: "cursos",
    underscored: true,
  }
);
