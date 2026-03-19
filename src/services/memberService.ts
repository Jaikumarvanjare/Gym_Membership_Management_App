import pool from "../config/db";
import { AppError } from "../middleware/errorHandler";
import { CreateMemberInput, UpdateMemberInput } from "../validators/memberValidator";

// Membership durations in days per type
const MEMBERSHIP_DURATION: Record<string, number> = {
  monthly: 30,
  quarterly: 90,
  annual: 365,
};

export const createMemberService = async (input: CreateMemberInput) => {
  const { name, email, membership_type } = input;

  const existing = await pool.query(
    "SELECT id FROM members WHERE email = $1",
    [email]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    throw new AppError("A member with this email already exists", 409);
  }

  const days = MEMBERSHIP_DURATION[membership_type];
  const result = await pool.query(
    `INSERT INTO members (name, email, membership_type, membership_end, membership_status)
     VALUES ($1, $2, $3, CURRENT_DATE + $4::int, 'active')
     RETURNING *`,
    [name, email, membership_type, days]
  );

  return result.rows[0];
};

export const getMembersService = async (
  page: number,
  limit: number,
  membership_type?: string
) => {
  const offset = (page - 1) * limit;

  // Build query dynamically only when the filter is provided
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (membership_type) {
    conditions.push(`membership_type = $${params.length + 1}`);
    params.push(membership_type);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM members ${where}`,
    params
  );

  const dataResult = await pool.query(
    `SELECT * FROM members ${where}
     ORDER BY join_date DESC
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );

  return {
    total: Number(countResult.rows[0].count),
    data: dataResult.rows,
  };
};

export const getMemberByIdService = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM members WHERE id = $1",
    [id]
  );
  return result.rows[0] ?? null;
};

export const updateMemberService = async (
  id: number,
  input: UpdateMemberInput
) => {
  // Build SET clause only for fields that were provided
  const fields = Object.entries(input).filter(([, v]) => v !== undefined);
  if (fields.length === 0) return null;

  const setClauses = fields.map(([key], i) => `${key} = $${i + 1}`);
  const values = fields.map(([, v]) => v);

  const result = await pool.query(
    `UPDATE members SET ${setClauses.join(", ")}
     WHERE id = $${values.length + 1}
     RETURNING *`,
    [...values, id]
  );

  return result.rows[0] ?? null;
};

export const deleteMemberService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rows[0] ?? null;
};

export const getExpiredMembersService = async () => {
  const result = await pool.query(
    `SELECT * FROM members
     WHERE membership_status = 'expired'
     ORDER BY membership_end DESC`
  );
  return result.rows;
};