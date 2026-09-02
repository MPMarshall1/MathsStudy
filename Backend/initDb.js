import mysql from "mysql2/promise";
import "dotenv/config";

async function initDb() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "MathsStudyUsers",
    });

    console.log("Connected to MathsStudyUsers.");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("✅ 'users' table is ready.");
  } catch (err) {
    console.error("❌ Failed to create table:", err.message);
    process.exitCode = 1;
  } finally {
    if (connection) await connection.end();
  }
}

initDb();
