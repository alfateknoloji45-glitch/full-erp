const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Get company modules
router.get('/', authMiddleware, async (req, res) => {
  const modules = await query(`
    SELECT m.*, cm.enabled, cm.activated_at
    FROM modules m
    LEFT JOIN company_modules cm ON m.id = cm.module_id AND cm.company_id = $1
  `, [req.user.company_id]);
  
  res.json(modules.rows);
});

// Toggle module
router.post('/:moduleId/toggle', authMiddleware, async (req, res) => {
  const { moduleId } = req.params;
  const companyId = req.user.company_id;
  
  // Check if module exists and plan allows
  const module = await query('SELECT * FROM modules WHERE id = $1', [moduleId]);
  if (!module.rows[0]) {
    return res.status(404).json({ error: 'Module not found' });
  }
  
  // Toggle
  const result = await query(`
    INSERT INTO company_modules (company_id, module_id, enabled)
    VALUES ($1, $2, true)
    ON CONFLICT (company_id, module_id)
    DO UPDATE SET enabled = NOT company_modules.enabled, activated_at = NOW()
    RETURNING *
  `, [companyId, moduleId]);
  
  res.json(result.rows[0]);
});

module.exports = router;
