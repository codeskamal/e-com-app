export const PORT = process.env.PORT || 5000;

export const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://root:root@localhost:3306/e_com_app_0826";

export const JWT_SECRET =
  process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";

export const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
