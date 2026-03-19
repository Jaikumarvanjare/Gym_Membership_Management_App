import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db";
import { AppError } from "../middleware/errorHandler";

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export const signupService = async (
  email: string,
  password: string,
  role: "admin" | "customer"
) => {
  // Check for existing user — return 409 Conflict, not 500
  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    throw new AppError("Email is already registered", 409);
  }

  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, $3)
     RETURNING id, email, role, created_at`,
    [email, password_hash, role]
  );

  return result.rows[0];
};

export const loginService = async (email: string, password: string) => {
  const result = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  // Use a constant-time comparison — never reveal whether email or password failed
  const isValid =
    user && (await bcrypt.compare(password, user.password_hash));

  if (!isValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET as jwt.Secret,
    { expiresIn: (JWT_EXPIRES_IN ?? "7d") as unknown as number }
  );

  return token;
};