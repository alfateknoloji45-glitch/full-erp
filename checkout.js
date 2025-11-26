const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post('/create-session', async (req, res) => {
  const { plan, billingCycle, companyInfo, email } = req.body;
  
  // Create Stripe customer
  const customer = await stripe.customers.create({
    email: email,
    name: companyInfo.companyName,
    metadata: {
      company_id: companyInfo.companyId || 'new'
    }
  });
  
  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'subscription',
    line_items: [{
      price: getPriceId(plan, billingCycle),
      quantity: 1
    }],
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
    subscription_data: {
      trial_period_days: 14
    }
  });
  
  res.json({ sessionId: session.id, url: session.url });
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'invoice.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
    }
    
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

const handleCheckoutComplete = async (session) => {
  // Create/update company
  // Create subscription record
  // Send welcome email
  // Activate license
};

const getPriceId = (plan, cycle) => {
  const priceIds = {
    'starter-monthly': 'price_starter_month',
    'starter-annual': 'price_starter_year',
    'pro-monthly': 'price_pro_month',
    'pro-annual': 'price_pro_year'
  };
  return priceIds[`${plan}-${cycle}`];
};

module.exports = router;
