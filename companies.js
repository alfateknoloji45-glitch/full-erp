const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create company (signup)
router.post('/create', async (req, res) => {
  try {
    const { name, subdomain, email, phone, address, industry, size, plan, adminUser } = req.body;
    
    // Check if subdomain is available
    const existing = await query('SELECT id FROM companies WHERE subdomain = $1', [subdomain]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Subdomain already taken' });
    }
    
    // Create company
    const companyResult = await query(
      `INSERT INTO companies (name, subdomain, email, phone, address, industry, size, plan, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, subdomain, email, phone, address, industry, size, plan, 'active']
    );
    
    const company = companyResult.rows[0];
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);
    const userResult = await query(
      `INSERT INTO users (email, password, name, role, company_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, name, role`,
      [adminUser.email, hashedPassword, adminUser.name, 'admin', company.id]
    );
    
    const user = userResult.rows[0];
    
    // Create subscription (14 days trial)
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 14);
    
    await query(
      `INSERT INTO subscriptions (user_id, company_id, plan_id, status, trial_ends_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, company.id, plan, 'trial', trialEnd]
    );
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, company_id: company.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      company,
      user,
      token,
      subdomain_url: `https://${subdomain}.alfaierp.com`
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check subdomain availability
router.get('/check-subdomain/:subdomain', async (req, res) => {
  try {
    const result = await query('SELECT id FROM companies WHERE subdomain = $1', [req.params.subdomain]);
    res.json({ available: result.rows.length === 0 });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get company info
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM companies WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
