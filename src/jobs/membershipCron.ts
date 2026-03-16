import cron from "node-cron";
import pool from "../config/db";

export const membershipExpiryJob = () => {

  cron.schedule("0 0 * * *", async () => {

    try {

      await pool.query(`
        UPDATE members
        SET membership_status = 'expired'
        WHERE membership_end < CURRENT_DATE
      `);

      console.log("Membership expiry job executed");

    } catch (error) {

      console.error("Membership expiry job failed", error);

    }

  });

};