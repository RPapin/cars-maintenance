require("dotenv").config();
const { Pool } = require("pg");

// Configure PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

// Generic query function
const query = async (text, params) => {
  try {
    const res = await pool.query(text, params);
    return res.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  }
};

module.exports = { query };
