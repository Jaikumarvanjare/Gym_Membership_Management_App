import { z } from "zod";

const MEMBERSHIP_TYPES = ["monthly", "quarterly", "annual"] as const;

export const createMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  membership_type: z.enum(MEMBERSHIP_TYPES).refine(
    (val) => MEMBERSHIP_TYPES.includes(val),
    { message: "membership_type must be monthly, quarterly, or annual" }
  ),
});

export const updateMemberSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  membership_type: z.enum(MEMBERSHIP_TYPES).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);

export type CreateMemberInput = z.infer<typeof createMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;