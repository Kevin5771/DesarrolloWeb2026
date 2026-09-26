import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.resolve(__dirname, "../../logs");
const logFile = path.join(logsDir, "cursos.log");

export async function registrarCreacionCurso(curso, usuarioId) {
  await fs.mkdir(logsDir, { recursive: true });

  const linea =
    `[${new Date().toISOString()}] ` +
    `curso_id=${curso.id} ` +
    `codigo=${curso.codigo} ` +
    `nombre="${curso.nombre}" ` +
    `usuario_id=${usuarioId}\n`;

  await fs.appendFile(logFile, linea, "utf8");
}
