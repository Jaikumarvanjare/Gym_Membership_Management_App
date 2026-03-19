import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../middleware/errorHandler";
import {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService,
  getExpiredMembersService,
} from "../services/memberService";
import { CreateMemberInput, UpdateMemberInput } from "../validators/memberValidator";

export const createMember = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as CreateMemberInput;
  const member = await createMemberService(body);
  res.status(201).json({ success: true, data: member });
});

export const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const membership_type = req.query.membership_type as string | undefined;

  const result = await getMembersService(page, limit, membership_type);

  res.status(200).json({
    success: true,
    data: result.data,
    meta: { page, limit, total: result.total },
  });
});

export const getMemberById = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new AppError("Invalid member ID", 400);

  const member = await getMemberByIdService(id);
  if (!member) throw new AppError("Member not found", 404);

  res.status(200).json({ success: true, data: member });
});

export const updateMember = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new AppError("Invalid member ID", 400);

  const body = req.body as UpdateMemberInput;
  const member = await updateMemberService(id, body);
  if (!member) throw new AppError("Member not found", 404);

  res.status(200).json({ success: true, data: member });
});

export const deleteMember = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw new AppError("Invalid member ID", 400);

  const deleted = await deleteMemberService(id);
  if (!deleted) throw new AppError("Member not found", 404);

  res.status(200).json({ success: true, message: "Member deleted successfully" });
});

export const getExpiredMembers = asyncHandler(async (_req: Request, res: Response) => {
  const members = await getExpiredMembersService();
  res.status(200).json({ success: true, data: members });
});