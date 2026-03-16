import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Swagger Docs
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Routes
 */
app.use("/gmma/api/v1", adminRoutes);
app.use("/gmma/api/v1", authRoutes);
app.use("/gmma/api/v1", memberRoutes);
app.use("/gmma/api/v1", paymentRoutes);
app.use("/gmma/api/v1", dashboardRoutes);

/**
 * Root route
 */
app.get("/", (req, res) => {
  res.send("Gym Membership Management API running");
});

/**
 * Global Error Handler
 */
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

  /**
   * Start Cron Job
   */
  membershipExpiryJob();

});