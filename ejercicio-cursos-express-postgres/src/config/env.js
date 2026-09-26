import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 3000),
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/desarrollo_web",
  sessionSecret: process.env.SESSION_SECRET || "dev-session-secret",
  jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  nodeEnv: process.env.NODE_ENV || "development",
};
