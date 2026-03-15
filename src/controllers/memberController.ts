import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService
} from "../services/memberService";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

/**
 * Create Member (Admin only)
 */
export const createMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can create members"
      });
    }

    const { name, email, membership_type } = req.body;

    const member = await createMemberService(
      name,
      email,
      membership_type
    );

    res.status(201).json(member);
  }
);

/**
 * Get All Members (Admin only)
 */
export const getMembers = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can view all members"
      });
    }

    const members = await getMembersService();

    res.status(200).json(members);
  }
);

/**
 * Get Member By ID
 * Admin can view any
 * Customer can view own
 */
export const getMemberById = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid member id"
      });
    }

    const member = await getMemberByIdService(id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    if (req.user?.role !== "admin" && req.user?.id !== member.id) {
      return res.status(403).json({
        message: "Unauthorized access"
      });
    }

    res.status(200).json(member);
  }
);

/**
 * Update Member (Admin only)
 */
export const updateMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can update members"
      });
    }

    const id = Number(req.params.id);
    const { name, email, membership_type } = req.body;

    const member = await updateMemberService(
      id,
      name,
      email,
      membership_type
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json(member);
  }
);

/**
 * Delete Member (Admin only)
 */
export const deleteMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete members"
      });
    }

    const id = Number(req.params.id);

    const member = await deleteMemberService(id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found"
      });
    }

    res.status(200).json({
      message: "Member deleted successfully"
    });
  }
);