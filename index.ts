import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRoutes from "./src/routes/memberRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/gmma/api/v1", memberRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});