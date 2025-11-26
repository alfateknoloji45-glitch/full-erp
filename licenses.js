const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authMiddleware, authorize } = require('../middleware/auth');
const crypto = require('crypto');

// Generate license key
const generateLicenseKey = (type) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = 6;
  const segmentLength = 4;
  
  let key = `ALFAI-${type.substring(0, 3).toUpperCase()}-`;
  
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segmentLength; j++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (i < segments - 1) key += '-';
  }
  
  return key;
};

// Get all licenses (admin)
router.get('/', authMiddleware, authorize('admin'), async (req, res) => {
  const licenses = await query('SELECT * FROM licenses ORDER BY created_at DESC');
  res.json(licenses.rows);
});

// Create license
router.post('/create', authMiddleware, authorize('admin'), async (req, res) => {
  const { type, companyId, duration } = req.body;
  const key = generateLicenseKey(type);
  
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + (duration || 1));
  
  const result = await query(`
    INSERT INTO licenses (license_key, type, company_id, expires_at, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [key, type, companyId, expiresAt, 'active']);
  
  res.status(201).json(result.rows[0]);
});

// Validate license
router.post('/validate', async (req, res) => {
  const { licenseKey } = req.body;
  
  const result = await query(`
    SELECT * FROM licenses 
    WHERE license_key = $1 
    AND status = 'active' 
    AND expires_at > NOW()
  `, [licenseKey]);
  
  if (result.rows.length === 0) {
    return res.status(400).json({ valid: false, error: 'Invalid or expired license' });
  }
  
  res.json({ valid: true, license: result.rows[0] });
});

// Revoke license
router.post('/:id/revoke', authMiddleware, authorize('admin'), async (req, res) => {
  const result = await query(`
    UPDATE licenses SET status = 'revoked' WHERE id = $1 RETURNING *
  `, [req.params.id]);
  
  res.json(result.rows[0]);
});

// Extend license
router.post('/:id/extend', authMiddleware, authorize('admin'), async (req, res) => {
  const { months } = req.body;
  
  const result = await query(`
    UPDATE licenses 
    SET expires_at = expires_at + INTERVAL '${months} months'
    WHERE id = $1 
    RETURNING *
  `, [req.params.id]);
  
  res.json(result.rows[0]);
});

module.exports = router;
