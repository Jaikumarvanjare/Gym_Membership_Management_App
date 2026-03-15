import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService
} from "../services/memberService";

import {
  CreateMemberDTO,
  UpdateMemberDTO
} from "../dto/member.dto";

type MemberParams = {
  id: string;
};

/**
 * Create Member
 */
export const createMember = asyncHandler(
  async (req: Request<{}, {}, CreateMemberDTO>, res: Response) => {
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
 * Get All Members
 */
export const getMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const members = await getMembersService();

    res.status(200).json(members);
  }
);

/**
 * Get Member By ID
 */
export const getMemberById = asyncHandler(
  async (req: Request<MemberParams>, res: Response) => {
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

    res.status(200).json(member);
  }
);

/**
 * Update Member
 */
export const updateMember = asyncHandler(
  async (req: Request<MemberParams, {}, UpdateMemberDTO>, res: Response) => {
    const id = Number(req.params.id);
    const { name, email, membership_type } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid member id"
      });
    }

    const member = await updateMemberService(
      id,
      name!,
      email!,
      membership_type!
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
 * Delete Member
 */
export const deleteMember = asyncHandler(
  async (req: Request<MemberParams>, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid member id"
      });
    }

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