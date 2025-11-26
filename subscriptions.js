const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get current subscription
router.get('/current', authMiddleware, async (req, res) => {
  const result = await query(
    'SELECT * FROM subscriptions WHERE user_id = $1 AND status = $2',
    [req.user.id, 'active']
  );
  res.json(result.rows[0] || null);
});

// Create subscription
router.post('/create', authMiddleware, async (req, res) => {
  const { plan_id } = req.body;
  
  // Create Stripe subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.user.stripe_customer_id,
    items: [{ price: plan_id }]
  });

  // Save to database
  const result = await query(
    'INSERT INTO subscriptions (user_id, plan_id, stripe_subscription_id, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [req.user.id, plan_id, subscription.id, 'active']
  );

  res.json(result.rows[0]);
});

// Cancel subscription
router.post('/:id/cancel', authMiddleware, async (req, res) => {
  await stripe.subscriptions.cancel(req.params.id);
  await query('UPDATE subscriptions SET status = $1 WHERE stripe_subscription_id = $2', ['cancelled', req.params.id]);
  res.json({ message: 'Subscription cancelled' });
});

// Get usage
router.get('/usage', authMiddleware, async (req, res) => {
  const quotes = await query('SELECT COUNT(*) FROM quotes WHERE created_by = $1 AND created_at >= date_trunc(\'month\', CURRENT_DATE)', [req.user.id]);
  const users = await query('SELECT COUNT(*) FROM users WHERE company_id = $1', [req.user.company_id]);
  
  res.json({
    quotes: parseInt(quotes.rows[0].count),
    users: parseInt(users.rows[0].count)
  });
});

module.exports = router;
