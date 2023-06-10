import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY as string;

const stripe = new Stripe(apiKey, {
    apiVersion: '2022-11-15',
});

const paymentInput = z
    .object({
        item: z.object({
            name: z.string(),
            price: z.number(),
            oldPrice: z.number().nullable(),
            id: z.number(),
            mainImage: z.object({ url: z.string() }).nullable(),
        }),
        size: z.object({ name: z.string(), id: z.number() }),
        colour: z.object({ name: z.string(), id: z.number() }),
        quantity: z.number(),
    })
    .array()
    .optional();

export const paymentRouter = createTRPCRouter({
    makePayment: publicProcedure.input(paymentInput).mutation(async ({ ctx, input: items }) => {
        if (items == null || items.length === 0) return null;
        const session = await stripe.checkout.sessions.create({
            line_items: items?.map(({ item, size, colour, quantity }) => {
                return {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name,
                            metadata: {
                                size: size.name,
                                colour: colour.name,
                            },
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity,
                };
            }),
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/basket`,
            cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/basket`,
        });
        return session.url;
    }),
});
