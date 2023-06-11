import { createTRPCRouter } from '@/server/api/trpc';
import { itemRouter } from './routers/item';
import { paymentRouter } from './routers/payment';
import { adminRouter } from './routers/admin';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    items: itemRouter,
    payment: paymentRouter,
    admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
