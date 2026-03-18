import pool from "../config/db";

/**
 * Create Payment + Update Membership
 */
export const createPaymentService = async (
  member_id: number,
  amount: number,
  payment_method: string
) => {

  if (amount <= 0) {
    const error: any = new Error("Amount must be greater than 0");
    error.status = 400;
    throw error;
  }

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    // Check member
    const memberRes = await client.query(
      `SELECT id, membership_end
       FROM members
       WHERE id = $1`,
      [member_id]
    );

    if (memberRes.rows.length === 0) {
      const error: any = new Error("Member not found");
      error.status = 404;
      throw error;
    }

    const member = memberRes.rows[0];

    // Insert payment
    const paymentRes = await client.query(
      `INSERT INTO payments (member_id, amount, payment_method)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [member_id, amount, payment_method]
    );

    // Membership update logic
    await client.query(
      `
      UPDATE members
      SET
        membership_start = CASE
          WHEN membership_end IS NULL OR membership_end < CURRENT_DATE
          THEN CURRENT_DATE
          ELSE membership_start
        END,

        membership_end = CASE
          WHEN membership_end IS NULL OR membership_end < CURRENT_DATE
          THEN CURRENT_DATE + INTERVAL '30 days'
          ELSE membership_end + INTERVAL '30 days'
        END,

        membership_status = 'active'

      WHERE id = $1
      `,
      [member_id]
    );

    await client.query("COMMIT");

    return paymentRes.rows[0];

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {
    client.release();
  }
};


/**
 * Get All Payments
 */
export const getPaymentsService = async () => {

  const result = await pool.query(
    `SELECT *
     FROM payments
     ORDER BY payment_date DESC`
  );

  return result.rows;
};


/**
 * Get Payments By Member
 */
export const getPaymentsByMemberService = async (member_id: number) => {

  const result = await pool.query(
    `SELECT *
     FROM payments
     WHERE member_id = $1
     ORDER BY payment_date DESC`,
    [member_id]
  );

  return result.rows;
};