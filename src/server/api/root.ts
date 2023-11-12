import { createTRPCRouter } from '@/server/api/trpc';
import { itemRouter } from './routers/item';
import { paymentRouter } from './routers/payment';
import { adminRouter } from './routers/admin';
import { emailRouter } from './routers/email';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    items: itemRouter,
    payment: paymentRouter,
    admin: adminRouter,
    emailSubscriptions: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
