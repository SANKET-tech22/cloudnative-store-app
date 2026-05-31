const pool = require("../config/db");

async function createUser(id, name, email, passwordHash) {
  const query = `
    INSERT INTO users (id, name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email
  `;

  const values = [id, name, email, passwordHash];

  const result = await pool.query(query, values);

  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
}

module.exports = {
  createUser,
  findUserByEmail,
};