import {
  hashearPassword,
  verificarPassword,
} from "../src/auth/passwords.js";
import { firmarToken, verificarToken } from "../src/auth/jwt.js";

describe("Autenticación", () => {
  test("la contraseña se guarda hasheada y se puede verificar", async () => {
    const password = "123456";
    const hash = await hashearPassword(password);

    expect(hash).not.toBe(password);
    await expect(verificarPassword(password, hash)).resolves.toBe(true);
    await expect(verificarPassword("incorrecta", hash)).resolves.toBe(false);
  });

  test("se puede firmar y verificar un JWT", () => {
    const token = firmarToken({
      sub: 1,
      email: "alumno@umg.edu.gt",
      rol: "usuario",
    });

    const payload = verificarToken(token);

    expect(payload.sub).toBe(1);
    expect(payload.email).toBe("alumno@umg.edu.gt");
    expect(payload.rol).toBe("usuario");
  });
});
