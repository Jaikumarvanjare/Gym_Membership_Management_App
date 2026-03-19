import pool from "../config/db";
import { AppError } from "../middleware/errorHandler";
import { CreatePaymentInput } from "../validators/paymentValidator";

export const createPaymentService = async (input: CreatePaymentInput) => {
  const { member_id, amount, payment_method } = input;

  // Verify the member exists before inserting
  const member = await pool.query(
    "SELECT id FROM members WHERE id = $1",
    [member_id]
  );
  if (!member.rowCount || member.rowCount === 0) {
    throw new AppError("Member not found", 404);
  }

  const result = await pool.query(
    `INSERT INTO payments (member_id, amount, payment_method)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [member_id, amount, payment_method]
  );

  return result.rows[0];
};

export const getPaymentsService = async () => {
  const result = await pool.query(
    `SELECT p.*, m.name AS member_name
     FROM payments p
     JOIN members m ON m.id = p.member_id
     ORDER BY p.payment_date DESC`
  );
  return result.rows;
};

export const getPaymentsByMemberService = async (memberId: number) => {
  const result = await pool.query(
    `SELECT * FROM payments
     WHERE member_id = $1
     ORDER BY payment_date DESC`,
    [memberId]
  );
  return result.rows;
};