import pool from "../config/db";

export const getDashboardStatsService = async () => {
  const [members, payments, expired] = await Promise.all([
    pool.query(`
      SELECT
        COUNT(*)                                            AS total_members,
        COUNT(*) FILTER (WHERE membership_status = 'active')   AS active_members,
        COUNT(*) FILTER (WHERE membership_status = 'expired')  AS expired_members,
        COUNT(*) FILTER (WHERE membership_status = 'inactive') AS inactive_members
      FROM members
    `),
    pool.query(`
      SELECT
        COALESCE(SUM(amount), 0)                                        AS total_revenue,
        COALESCE(SUM(amount) FILTER (
          WHERE payment_date >= date_trunc('month', CURRENT_DATE)
        ), 0)                                                           AS revenue_this_month
      FROM payments
    `),
    pool.query(`
      SELECT COUNT(*) AS expiring_soon
      FROM members
      WHERE membership_end BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
        AND membership_status = 'active'
    `),
  ]);

  return {
    members: members.rows[0],
    payments: payments.rows[0],
    alerts: expired.rows[0],
  };
};