import { Router } from 'express';
import Stripe from 'stripe';
import pocketbaseClient from '../utils/pocketbaseClient.js';
import { pocketbaseAuth } from '../middleware/pocketbase-auth.js';
import logger from '../utils/logger.js';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.use(pocketbaseAuth);

// Create Checkout Session
router.post('/create-checkout', async (req, res) => {
  const { amount, productName, successUrl, cancelUrl } = req.body;

  if (!amount || !productName || !successUrl || !cancelUrl) {
    return res.status(400).json({ error: 'Missing required fields: amount, productName, successUrl, cancelUrl' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: productName },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.json({ url: session.url });
});

// Verify payment session and update subscription
router.get('/session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  let subscriptionUpdated = false;

  // If payment is successful and user is authenticated, update subscription in PocketBase
  if (session.payment_status === 'paid' && req.pocketbaseUserId) {
    try {
      await pocketbaseClient.collection('users').update(req.pocketbaseUserId, {
        subscription: 'premium',
      });
      subscriptionUpdated = true;
      logger.info(`Updated user ${req.pocketbaseUserId} to premium subscription`);
    } catch (error) {
      logger.error(`Failed to update subscription for user ${req.pocketbaseUserId}:`, error);
    }
  }

  res.json({
    id: session.id,
    status: session.payment_status,
    amountTotal: session.amount_total,
    customerEmail: session.customer_details?.email,
    subscriptionUpdated,
  });
});

export default router;
