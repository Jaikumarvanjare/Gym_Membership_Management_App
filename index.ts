import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: "Too many requests, try again later"
});

app.use(limiter);

app.use(cors());
app.use(express.json());


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/gmma/api/v1", adminRoutes);
app.use("/gmma/api/v1", authRoutes);
app.use("/gmma/api/v1", memberRoutes);
app.use("/gmma/api/v1", paymentRoutes);
app.use("/gmma/api/v1", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Gym Membership Management API running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

  membershipExpiryJob();

});