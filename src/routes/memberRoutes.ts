import express from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember
} from "../controllers/memberController";

const router = express.Router();

router.post("/members", createMember);
router.get("/members", getMembers);
router.get("/members/:id", getMemberById);
router.put("/members/:id", updateMember);
router.delete("/members/:id", deleteMember);

export default router;