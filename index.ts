import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger";
import memberRoutes from "./src/routes/memberRoutes";
import authRoutes from "./src/routes/authRoutes";
import { errorHandler } from "./src/middleware/errorHandler";
import adminRoutes from "./src/routes/adminRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/gmma/api/v1", adminRoutes);
app.use("/gmma/api/v1", authRoutes);
app.use("/gmma/api/v1", memberRoutes);

app.get("/", (req, res) => {
  res.send("Gym Membership Management API running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});