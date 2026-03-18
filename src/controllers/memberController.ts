import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService,
  getExpiredMembersService
} from "../services/memberService";

interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

/**
 * Create Member
 */
export const createMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const { name, email, membership_type } = req.body;

    const member = await createMemberService(
      name,
      email,
      membership_type
    );

    res.status(201).json({
      success: true,
      data: member
    });
  }
);

/**
 * Get Members
 */
export const getMembers = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const membership_type = req.query.membership_type as string;

    const result = await getMembersService(
      page,
      limit,
      membership_type
    );

    res.json({
      success: true,
      page,
      limit,
      total: result.total,
      data: result.data
    });
  }
);

/**
 * Get Member By ID
 */
export const getMemberById = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const id = Number(req.params.id);

    const member = await getMemberByIdService(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      data: member
    });
  }
);

/**
 * Update Member
 */
export const updateMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

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
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      data: member
    });
  }
);

/**
 * Delete Member
 */
export const deleteMember = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const id = Number(req.params.id);

    const member = await deleteMemberService(id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found"
      });
    }

    res.json({
      success: true,
      message: "Member deleted successfully"
    });
  }
);

/**
 * Get Expired Members
 */
export const getExpiredMembers = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const members = await getExpiredMembersService();

    res.json({
      success: true,
      data: members
    });
  }
);