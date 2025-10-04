require("dotenv").config();
const { Pool } = require("pg");

// Check for required environment variables
// Accept either DB_* or Railway's POSTGRES* variables
const dbHost = process.env.DB_HOST || process.env.PGHOST || process.env.POSTGRES_HOST;
const dbUser = process.env.DB_USER || process.env.PGUSER || process.env.POSTGRES_USER;
const dbPassword = process.env.DB_PASSWORD || process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
const dbName = process.env.DB_NAME || process.env.PGDATABASE || process.env.POSTGRES_DATABASE;

if (!dbHost || !dbUser || !dbPassword || !dbName) {
  console.error('Missing required database configuration!');
  console.error('Please ensure PostgreSQL service is linked on Railway or set local .env variables');
  console.error('Required: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
}

// Configure PostgreSQL connection
// Railway provides POSTGRES* variables, fallback to DB_* for local development
const pool = new Pool({
  host: process.env.DB_HOST || process.env.PGHOST || process.env.POSTGRES_HOST,
  user: process.env.DB_USER || process.env.PGUSER || process.env.POSTGRES_USER,
  password: String(process.env.DB_PASSWORD || process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD),
  database: process.env.DB_NAME || process.env.PGDATABASE || process.env.POSTGRES_DATABASE,
  port: process.env.DB_PORT || process.env.PGPORT || process.env.POSTGRES_PORT || 5432,
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
