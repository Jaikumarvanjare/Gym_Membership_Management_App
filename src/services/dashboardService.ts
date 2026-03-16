import pool from "../config/db";

export const getDashboardStatsService = async () => {

  const totalMembers = await pool.query(
    `SELECT COUNT(*) FROM members`
  );

  const activeMembers = await pool.query(
    `SELECT COUNT(*) FROM members
     WHERE membership_end >= CURRENT_DATE`
  );

  const expiredMembers = await pool.query(
    `SELECT COUNT(*) FROM members
     WHERE membership_end < CURRENT_DATE`
  );

  const revenue = await pool.query(
    `SELECT COALESCE(SUM(amount),0) FROM payments`
  );

  return {
    total_members: Number(totalMembers.rows[0].count),
    active_members: Number(activeMembers.rows[0].count),
    expired_members: Number(expiredMembers.rows[0].count),
    total_revenue: Number(revenue.rows[0].coalesce)
  };

};