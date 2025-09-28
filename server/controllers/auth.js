// Backend: Node.js (Express) + PostgreSQL + JWT Auth
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const dbService = require("../services/dbService");

// JWT Secret (dans un vrai projet, utilisez une variable d'environnement)
const SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Auth routes
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await dbService.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await dbService.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.length === 0) return res.sendStatus(401);
  const user = result[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.sendStatus(401);
  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;

// PostgreSQL Schema
// CREATE TABLE users (id SERIAL PRIMARY KEY, username TEXT UNIQUE, password TEXT);
// CREATE TABLE items (id SERIAL PRIMARY KEY, name TEXT);


// Frontend: Angular 17+ with Angular Material and Signals
// Due to code length, the Angular code (components, services, guards, and signal-based stores) will be in a separate snippet.
// Let me know if you'd like that next.
