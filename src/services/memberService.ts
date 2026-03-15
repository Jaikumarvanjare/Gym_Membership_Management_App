import pool from "../config/db";

export const createMemberService = async (
  name: string,
  email: string,
  membership_type: string
) => {
  const result = await pool.query(
    "INSERT INTO members (name, email, membership_type) VALUES ($1,$2,$3) RETURNING *",
    [name, email, membership_type]
  );

  return result.rows[0];
};

export const getMembersService = async (
  page: number,
  limit: number,
  membership_type?: string
) => {

  const offset = (page - 1) * limit;

  let query = "SELECT * FROM members";
  let values: any[] = [];

  if (membership_type) {
    query += " WHERE membership_type = $1";
    values.push(membership_type);
  }

  query += " ORDER BY id ASC LIMIT $" + (values.length + 1) +
           " OFFSET $" + (values.length + 2);

  values.push(limit, offset);

  const result = await pool.query(query, values);

  return result.rows;
};

export const getMemberByIdService = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM members WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

export const updateMemberService = async (
  id: number,
  name: string,
  email: string,
  membership_type: string
) => {
  const result = await pool.query(
    "UPDATE members SET name=$1,email=$2,membership_type=$3 WHERE id=$4 RETURNING *",
    [name, email, membership_type, id]
  );

  return result.rows[0];
};

export const deleteMemberService = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};