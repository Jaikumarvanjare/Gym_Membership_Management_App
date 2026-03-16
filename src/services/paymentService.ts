import pool from "../config/db";

export const createPaymentService = async (
  member_id: number,
  amount: number,
  payment_method: string
) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    // Check if member exists
    const member = await client.query(
      `SELECT id FROM members WHERE id = $1`,
      [member_id]
    );

    if (member.rows.length === 0) {
      throw new Error("Member not found");
    }

    // Insert payment
    const payment = await client.query(
      `INSERT INTO payments (member_id, amount, payment_method)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [member_id, amount, payment_method]
    );

    // Update membership
    await client.query(
      `UPDATE members
       SET membership_start = CURRENT_DATE,
           membership_end = CURRENT_DATE + INTERVAL '30 days',
           membership_status = 'active'
       WHERE id = $1`,
      [member_id]
    );

    await client.query("COMMIT");

    return payment.rows[0];

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }
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


export const getExpiredMembersService = async () => {

  const result = await pool.query(
    `SELECT *
     FROM members
     WHERE membership_end < CURRENT_DATE`
  );

  return result.rows;
};