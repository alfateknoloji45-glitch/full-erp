const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authMiddleware, authorize } = require('../middleware/auth');

// Get current version
router.get('/current', async (req, res) => {
  const version = process.env.APP_VERSION || '2.5.3';
  res.json({ version });
});

// Check for updates
router.get('/check', authMiddleware, async (req, res) => {
  const updates = await query(`
    SELECT * FROM software_updates 
    WHERE released = true 
    AND version > $1 
    ORDER BY version DESC
  `, [req.query.currentVersion || '0.0.0']);
  
  res.json(updates.rows);
});

// Get update details
router.get('/:version', async (req, res) => {
  const update = await query('SELECT * FROM software_updates WHERE version = $1', [req.params.version]);
  res.json(update.rows[0]);
});

// Create update (admin only)
router.post('/', authMiddleware, authorize('admin'), async (req, res) => {
  const { version, type, features, breaking, security } = req.body;
  
  const result = await query(`
    INSERT INTO software_updates (version, type, features, breaking, security, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [version, type, features, breaking, security, 'draft']);
  
  res.status(201).json(result.rows[0]);
});

// Release update
router.post('/:version/release', authMiddleware, authorize('admin'), async (req, res) => {
  const result = await query(`
    UPDATE software_updates 
    SET released = true, release_date = NOW()
    WHERE version = $1
    RETURNING *
  `, [req.params.version]);
  
  res.json(result.rows[0]);
});

module.exports = router;
