import express from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);

export default router;