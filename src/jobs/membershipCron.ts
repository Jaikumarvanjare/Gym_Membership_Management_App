import cron from "node-cron";
import pool from "../config/db";

export const membershipExpiryJob = (): void => {
  // Runs every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    const start = Date.now();
    try {
      const result = await pool.query(`
        UPDATE members
        SET membership_status = 'expired'
        WHERE membership_end < CURRENT_DATE
          AND membership_status != 'expired'
        RETURNING id
      `);

      const updated = result.rowCount ?? 0;
      console.log(
        `[Cron] Membership expiry job completed in ${Date.now() - start}ms — ${updated} record(s) updated`
      );
    } catch (error) {
      // Log the full error so it's visible in server logs / monitoring
      console.error("[Cron] Membership expiry job FAILED:", error);
      // Do NOT re-throw — a cron failure should not crash the server process
    }
  });

  console.log("[Cron] Membership expiry job scheduled (daily at 00:00)");
};