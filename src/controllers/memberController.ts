import { Request, Response } from "express";
import pool from "../config/db";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email, membership_type } = req.body;

    const result = await pool.query(
      "INSERT INTO members (name, email, membership_type) VALUES ($1,$2,$3) RETURNING *",
      [name, email, membership_type]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating member" });
  }
};