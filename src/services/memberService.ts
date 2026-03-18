import pool from "../config/db";

/**
 * Create Member
 */
export const createMemberService = async (
  name: string,
  email: string,
  membership_type: string
) => {

  // Check duplicate email
  const existing = await pool.query(
    "SELECT * FROM members WHERE email=$1",
    [email]
  );

  if (existing.rows.length > 0) {
    const error: any = new Error("Member already exists");
    error.status = 400;
    throw error;
  }

  const result = await pool.query(
    `INSERT INTO members 
     (name, email, membership_type, membership_start, membership_status)
     VALUES ($1,$2,$3,CURRENT_DATE,'active')
     RETURNING *`,
    [name, email, membership_type]
  );

  return result.rows[0];
};


/**
 * Get Members (Pagination + Filter + Total Count)
 */
export const getMembersService = async (
  page: number,
  limit: number,
  membership_type?: string
) => {

  const offset = (page - 1) * limit;

  let baseQuery = "FROM members";
  let values: any[] = [];

  if (membership_type) {
    baseQuery += " WHERE membership_type = $1";
    values.push(membership_type);
  }

  // Total count
  const countQuery = `SELECT COUNT(*) ${baseQuery}`;
  const countResult = await pool.query(countQuery, values);

  // Data query
  const dataQuery = `
    SELECT *
    ${baseQuery}
    ORDER BY id ASC
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  values.push(limit, offset);

  const dataResult = await pool.query(dataQuery, values);

  return {
    total: Number(countResult.rows[0].count),
    data: dataResult.rows
  };
};


/**
 * Get Member By ID
 */
export const getMemberByIdService = async (id: number) => {

  const result = await pool.query(
    "SELECT * FROM members WHERE id = $1",
    [id]
  );

  return result.rows[0];
};


/**
 * Update Member
 */
export const updateMemberService = async (
  id: number,
  name?: string,
  email?: string,
  membership_type?: string
) => {

  const result = await pool.query(
    `UPDATE members
     SET
       name = COALESCE($1, name),
       email = COALESCE($2, email),
       membership_type = COALESCE($3, membership_type)
     WHERE id = $4
     RETURNING *`,
    [name, email, membership_type, id]
  );

  return result.rows[0];
};


/**
 * Delete Member
 */
export const deleteMemberService = async (id: number) => {

  const result = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};


/**
 * Get Expired Members
 */
export const getExpiredMembersService = async () => {

  const result = await pool.query(
    `SELECT *
     FROM members
     WHERE membership_end < CURRENT_DATE`
  );

  return result.rows;
};