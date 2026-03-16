import pool from "../config/db";

export const createPaymentService = async (
  member_id: number,
  amount: number,
  payment_method: string
) => {

  const result = await pool.query(
    `INSERT INTO payments (member_id, amount, payment_method)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [member_id, amount, payment_method]
  );

  return result.rows[0];
};

export const getPaymentsService = async () => {

  const result = await pool.query(
    `SELECT * FROM payments
     ORDER BY payment_date DESC`
  );

  return result.rows;
};

export const getPaymentsByMemberService = async (member_id: number) => {

  const result = await pool.query(
    `SELECT * FROM payments
     WHERE member_id=$1
     ORDER BY payment_date DESC`,
    [member_id]
  );

  return result.rows;
};