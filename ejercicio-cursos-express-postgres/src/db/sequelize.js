import { Sequelize } from "sequelize";
import { config } from "../config/env.js";

export const sequelize = new Sequelize(config.databaseUrl, {
  dialect: "postgres",
  logging: false,
});
