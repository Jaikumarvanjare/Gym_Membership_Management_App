import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger";
import memberRoutes from "./src/routes/memberRoutes";
import authRoutes from "./src/routes/authRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import paymentRoutes from "./src/routes/paymentRoutes";
import dashboardRoutes from "./src/routes/dashboardRoutes";
import { errorHandler } from "./src/middleware/errorHandler";
import { membershipExpiryJob } from "./src/jobs/membershipCron";

dotenv.config();

// ── Startup validation ────────────────────────────────────────────────────────
// Fail immediately if required environment variables are missing.
// This prevents the server from starting in a broken state.
const REQUIRED_ENV = ["DATABASE_URL", "JWT_SECRET"] as const;
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`[Startup] Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const app = express();

// ── Security middleware ───────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    // In production set ALLOWED_ORIGINS=https://yourapp.com in .env
    // In development it falls back to localhost Flutter/web origins
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? [
      "http://localhost:3000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests, please try again later" },
  })
);

app.use(express.json());

// ── API docs ──────────────────────────────────────────────────────────────────
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ────────────────────────────────────────────────────────────────────
const API_PREFIX = "/gmma/api/v1";
app.use(API_PREFIX, authRoutes);
app.use(API_PREFIX, adminRoutes);
app.use(API_PREFIX, memberRoutes);
app.use(API_PREFIX, paymentRoutes);
app.use(API_PREFIX, dashboardRoutes);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Gym Membership Management API is running" });
});

// ── Global error handler — must be registered LAST ───────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT} (${process.env.NODE_ENV ?? "development"})`);
  console.log(`[Docs]   http://localhost:${PORT}/docs`);
  membershipExpiryJob();
});