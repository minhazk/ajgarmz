import { z } from 'zod';
import { adminProcedure, createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const emailRouter = createTRPCRouter({
    subscribeEmail: publicProcedure.input(z.string()).mutation(async ({ ctx, input: email }) => {
        const existingEmail = await ctx.prisma.emailSubscriptions.findUnique({ where: { email } });
        console.log(existingEmail);
        if (existingEmail != null) {
            throw new Error('Email already subscribed');
        } else {
            return await ctx.prisma.emailSubscriptions.create({
                data: { email },
            });
        }
    }),
    getEmails: adminProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.emailSubscriptions.findMany({
            select: {
                email: true,
            },
            where: {
                status: 'subscribed',
            },
        });
    }),
});
