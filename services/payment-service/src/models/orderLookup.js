const pool = require("../config/db");

async function getOrderById(id) {

  const result = await pool.query(
    `
    SELECT *
    FROM orders
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  getOrderById
};