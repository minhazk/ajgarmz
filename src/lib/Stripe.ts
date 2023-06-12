import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

// export const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY as string;
export const endpointSecret = 'whsec_2a5839f5c037c46cd03a3f792d32a8d3753669fe0dfefc296e6dfb691a47a397';
