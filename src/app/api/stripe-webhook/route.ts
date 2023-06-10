import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

export async function POST(req: NextApiRequest) {
    const sig = req.headers['stripe-signature'] as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ received: false, message: `Webhook Error: ${err}` });
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object as {
                id: string;
                receipt_email: string;
            };
            alert(`payment done ${paymentIntentSucceeded}`);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
