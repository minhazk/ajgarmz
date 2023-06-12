import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

export const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY as string;
