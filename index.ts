import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRoutes from "./src/routes/memberRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/gmma/api/v1", memberRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});