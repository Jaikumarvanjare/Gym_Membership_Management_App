import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { approveAdminService } from "../services/adminService";

export const approveAdmin = asyncHandler(
  async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    const admin = await approveAdminService(id);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found"
      });
    }

    res.json({
      message: "Admin approved successfully",
      admin
    });
  }
);