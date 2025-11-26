const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  const result = await query('SELECT * FROM quotes ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', authMiddleware, async (req, res) => {
  const { customer_name, customer_email, items, total, discount, tax } = req.body;
  const result = await query(
    'INSERT INTO quotes (customer_name, customer_email, items, total, discount, tax, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [customer_name, customer_email, JSON.stringify(items), total, discount, tax, req.user.id]
  );
  res.json(result.rows[0]);
});

router.put('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const result = await query('UPDATE quotes SET status = $1 WHERE id = $2 RETURNING *', [status, req.params.id]);
  res.json(result.rows[0]);
});

module.exports = router;
