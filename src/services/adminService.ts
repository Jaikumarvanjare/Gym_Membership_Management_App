import pool from "../config/db";

export const approveAdminService = async (id: number) => {
  const result = await pool.query(
    `UPDATE users
     SET status='confirmed'
     WHERE id=$1 AND role='admin'
     RETURNING id,email,role,status`,
    [id]
  );

  return result.rows[0];
};