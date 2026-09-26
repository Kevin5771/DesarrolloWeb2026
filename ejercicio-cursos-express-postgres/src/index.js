import { app } from "./app.js";
import { config } from "./config/env.js";
import { sequelize } from "./db/sequelize.js";
import { pool } from "./db/pool.js";
import "./models/index.js";

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado con Sequelize.");

    await sequelize.sync();
    console.log("Modelos sincronizados.");

    const server = app.listen(config.port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${config.port}`);
    });

    const apagar = async () => {
      console.log("\nCerrando servidor...");

      server.close(async () => {
        await sequelize.close();
        await pool.end();
        process.exit(0);
      });
    };

    process.on("SIGINT", apagar);
    process.on("SIGTERM", apagar);
  } catch (error) {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exit(1);
  }
}

iniciar();
