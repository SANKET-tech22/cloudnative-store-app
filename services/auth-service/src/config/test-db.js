require("dotenv").config();

const pool = require("./db");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(error);
  }
}

testConnection();