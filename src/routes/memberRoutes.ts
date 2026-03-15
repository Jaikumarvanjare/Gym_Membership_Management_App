import express from "express";
import { createMember, getMembers } from "../controllers/memberController";

const router = express.Router();

router.post("/members", createMember);
router.get("/members", getMembers);

export default router;