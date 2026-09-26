import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

export const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password_hash",
    },
    rol: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "usuario",
    },
  },
  {
    tableName: "usuarios",
    underscored: true,
  }
);
