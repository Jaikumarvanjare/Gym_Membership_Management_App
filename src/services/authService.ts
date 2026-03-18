import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupService = async (
  email: string,
  password: string,
  role: string
) => {

  if (!["admin", "customer"].includes(role)) {
    throw new Error("Invalid role");
  }

  const existing = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let status = "confirmed";

  if (role === "admin") {
    status = "pending";
  }

  const result = await pool.query(
    `INSERT INTO users (email,password,role,status)
     VALUES ($1,$2,$3,$4)
     RETURNING id,email,role,status`,
    [email, hashedPassword, role || "customer", status]
  );

  return result.rows[0];
};
export const loginService = async (
  email: string,
  password: string
) => {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret missing");
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  if (user.status !== "confirmed") {
    throw new Error("Account not approved yet");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};