import { prisma } from '@/server/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY as string
const endpointSecret = 'whsec_2a5839f5c037c46cd03a3f792d32a8d3753669fe0dfefc296e6dfb691a47a397';

export async function POST(req: NextRequest) {
    const buf = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
        // event = stripe.webhooks.constructEvent(Buffer.from(arrayBuffer), sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ received: false, message: `Webhook Error: ${err}` });
    }

    console.log(event.type);

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object as {
                id: string;
                receipt_email: string;
                amount: number;
                charges: {
                    data: any;
                };
                created: number;
                metadata: any;
                shipping: {
                    address: {
                        city: string;
                        country: string;
                        line1: string;
                        line2: string;
                        postal_code: string;
                        state: string;
                    };
                };
            };
            console.log(paymentIntentSucceeded);
            // await prisma.orderItem.createMany();
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return NextResponse.json({ received: true });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
