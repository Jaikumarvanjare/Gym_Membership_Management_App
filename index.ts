import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gym Membership API Running");
});

const PORT = process.env.PORT as string;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});