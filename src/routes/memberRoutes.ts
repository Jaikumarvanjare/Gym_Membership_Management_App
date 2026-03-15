import express from "express";
import { createMember, getMembers, getMemberById } from "../controllers/memberController";

const router = express.Router();

router.post("/members", createMember);
router.get("/members", getMembers);
router.get("/members/:id", getMemberById);

export default router;