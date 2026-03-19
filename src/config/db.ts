import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("connect", () => {
  console.log("[DB] PostgreSQL connection established");
});

pool.on("error", (err) => {
  console.error("[DB] Unexpected pool error:", err);
});

export default pool;