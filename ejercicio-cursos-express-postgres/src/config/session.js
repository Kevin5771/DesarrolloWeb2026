import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "../db/pool.js";
import { config } from "./env.js";

const PgStore = connectPgSimple(session);

export const sessionMiddleware = session({
  store: new PgStore({
    pool,
    tableName: "sesiones",
    createTableIfMissing: true,
  }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: config.nodeEnv === "production",
    maxAge: 1000 * 60 * 60 * 2,
  },
});
