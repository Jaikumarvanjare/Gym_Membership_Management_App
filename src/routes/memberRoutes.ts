import express from "express";
import { createMember } from "../controllers/memberController";

const router = express.Router();

router.post("/members", createMember);

export default router;