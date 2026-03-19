import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../middleware/errorHandler";
import { approveAdminService } from "../services/adminService";

export const approveAdmin = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new AppError("Invalid admin ID", 400);

  const admin = await approveAdminService(id);
  if (!admin) throw new AppError("Admin not found", 404);

  res.status(200).json({ success: true, message: "Admin approved successfully", data: admin });
});