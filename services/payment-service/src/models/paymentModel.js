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

async function findPaymentByOrderId(orderId) {
  const result = await pool.query(
    "SELECT * FROM payments WHERE order_id = $1",
    [orderId]
  );

  return result.rows[0];
}

async function deletePayment(id) {
  const result = await pool.query(
    "DELETE FROM payments WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

module.exports = {
  createPayment,
  getAllPayments,
  findPaymentByOrderId,
  deletePayment
};