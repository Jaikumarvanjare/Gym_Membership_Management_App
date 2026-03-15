import express from "express";
import { approveAdmin } from "../controllers/adminController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.patch("/admin/approve/:id", authenticate, approveAdmin);

export default router;