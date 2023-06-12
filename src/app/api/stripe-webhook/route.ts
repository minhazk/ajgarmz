import { endpointSecret, stripe } from '@/lib/Stripe';
import { prisma } from '@/server/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const buf = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
        return NextResponse.json({ received: false, message: `Webhook Error: ${err}` });
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object as {
                id: string;
                receipt_email: string;
                amount_received: number;
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
                    name: string;
                };
            };
            const amountPaid = paymentIntentSucceeded.amount_received / 100;
            const items = JSON.parse(paymentIntentSucceeded.metadata.items);
            const address = paymentIntentSucceeded.shipping.address;
            const recipientName = paymentIntentSucceeded.shipping.name;
            const shippingCost = items.reduce((prev: any, curr: any) => prev + curr.price * curr.quantity, 0) !== amountPaid ? 10 : 0;
            const orderId = paymentIntentSucceeded.id;
            const addressFormat = Object.fromEntries(Object.entries(address).filter(([_, v]) => v != null)) as any;
            await prisma.address.create({
                data: {
                    ...addressFormat,
                    recipientName,
                    orderItems: {
                        createMany: {
                            data: items.map((item: any) => {
                                return {
                                    orderId,
                                    itemId: item.itemId,
                                    colour: item.colour,
                                    size: item.size,
                                    quantity: item.quantity,
                                    amountPaid,
                                    shippingCost,
                                };
                            }),
                        },
                    },
                },
            });
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
            break;
    }

    return NextResponse.json({ received: true });
}
