const pool = require("../config/db");

async function createPayment(
  id,
  orderId,
  amount,
  paymentMethod
) {

  const result = await pool.query(
    `
    INSERT INTO payments
    (
      id,
      order_id,
      amount,
      payment_method
    )
    VALUES
    (
      $1,$2,$3,$4
    )
    RETURNING *
    `,
    [
      id,
      orderId,
      amount,
      paymentMethod
    ]
  );

  return result.rows[0];
}

async function getAllPayments() {

  const result = await pool.query(
    `
    SELECT *
    FROM payments
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}

module.exports = {
  createPayment,
  getAllPayments
};