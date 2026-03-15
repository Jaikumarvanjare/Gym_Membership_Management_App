import { Request, Response } from "express";
import pool from "../config/db";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * Create Member
 */
export const createMember = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, membership_type } = req.body;

  const result = await pool.query(
    "INSERT INTO members (name, email, membership_type) VALUES ($1, $2, $3) RETURNING *",
    [name, email, membership_type]
  );

  res.status(201).json(result.rows[0]);
});

/**
 * Get All Members
 */
export const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const result = await pool.query("SELECT * FROM members ORDER BY id ASC");

  res.status(200).json(result.rows);
});

/**
 * Get Member By ID
 */
export const getMemberById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM members WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(result.rows[0]);
  }
);

/**
 * Update Member
 */
export const updateMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, membership_type } = req.body;

    const result = await pool.query(
      "UPDATE members SET name = $1, email = $2, membership_type = $3 WHERE id = $4 RETURNING *",
      [name, email, membership_type, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(result.rows[0]);
  }
);

/**
 * Delete Member
 */
export const deleteMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM members WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  }
);