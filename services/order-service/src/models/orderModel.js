const pool = require("../config/db");

async function createOrder(
  id,
  userId,
  productId,
  quantity,
  totalPrice
) {

  const result = await pool.query(
    `
    INSERT INTO orders
    (
      id,
      user_id,
      product_id,
      quantity,
      total_price
    )
    VALUES
    (
      $1,$2,$3,$4,$5
    )
    RETURNING *
    `,
    [
      id,
      userId,
      productId,
      quantity,
      totalPrice
    ]
  );

  return result.rows[0];
}

async function getAllOrders() {

  const result = await pool.query(
    `
    SELECT *
    FROM orders
    ORDER BY created_at DESC
    `
  );

  return result.rows;
}


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

async function updateOrderStatus(
  id,
  status
) {

  const result = await pool.query(
    `
    UPDATE orders
    SET
      status = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [id, status]
  );

  return result.rows[0];
}

async function deleteOrder(id) {

  const result = await pool.query(
    `
    DELETE FROM orders
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
}


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};