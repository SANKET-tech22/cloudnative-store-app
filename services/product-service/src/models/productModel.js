const pool = require("../config/db");

async function createProduct(
  id,
  name,
  description,
  price,
  stock,
  category
) {
  const result = await pool.query(
    `
    INSERT INTO products
    (
      id,
      name,
      description,
      price,
      stock,
      category
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6
    )
    RETURNING *
    `,
    [id, name, description, price, stock, category]
  );

  return result.rows[0];
}

async function getAllProducts(
  page,
  limit,
  search,
  category
) {

  const offset = (page - 1) * limit;

  let query =
    "SELECT * FROM products WHERE 1=1";

  const values = [];

  let count = 1;

  if (search) {
    query += ` AND LOWER(name) LIKE LOWER($${count})`;
    values.push(`%${search}%`);
    count++;
  }

  if (category) {
    query += ` AND LOWER(category) = LOWER($${count})`;
    values.push(category);
    count++;
  }

  query += `
    ORDER BY created_at DESC
    LIMIT $${count}
    OFFSET $${count + 1}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(
    query,
    values
  );

  return result.rows;
}

async function getProductById(id) {
  const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
  );

  return result.rows[0];
}


// UPDATE FUNCTION
async function updateProduct(
  id,
  name,
  description,
  price,
  stock,
  category
) {

  const result = await pool.query(
    `
    UPDATE products
    SET
      name = $2,
      description = $3,
      price = $4,
      stock = $5,
      category = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
    `,
    [
      id,
      name,
      description,
      price,
      stock,
      category
    ]
  );

  return result.rows[0];
}

// DELETE FUNCTION
async function deleteProduct(id) {

  const result = await pool.query(
    `
    DELETE FROM products
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};