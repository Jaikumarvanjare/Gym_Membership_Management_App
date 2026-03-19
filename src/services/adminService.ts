import pool from "../config/db";

export const approveAdminService = async (id: number) => {
  const result = await pool.query(
    `UPDATE users
     SET is_approved = TRUE
     WHERE id = $1 AND role = 'admin'
     RETURNING id, email, role, is_approved`,
    [id]
  );
  return result.rows[0] ?? null;
};