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

export const getMembers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM members ORDER BY id ASC");

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching members" });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM members WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching member" });
  }
};