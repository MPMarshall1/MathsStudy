import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "MathsStudyUsers",
});

// Single endpoint that logs in OR registers
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  let user = rows[0];

  if (user) {
    // Existing user → verify password
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  } else {
    // New user → register
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hash]
    );
    user = { id: result.insertId, email };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, email: user.email });
});

app.listen(4000, () => console.log("Auth server on :4000"));