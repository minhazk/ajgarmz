import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const adminRouter = createTRPCRouter({
    searchItems: publicProcedure.input(z.string()).query(({ ctx, input: searchInput }) => {
        console.log(2, searchInput);
        return ctx.prisma.$queryRaw`
            SELECT * FROM Item
            WHERE name LIKE ${`%${searchInput}%`}
        `;
    }),
    updateItem: publicProcedure
        .input(
            z.object({
                id: z.number(),
                price: z.number(),
                oldPrice: z.number().nullable(),
            })
        )
        .mutation(({ ctx, input: { id, price, oldPrice } }) => {
            return ctx.prisma.item.update({
                where: { id },
                data: { price, oldPrice },
            });
        }),
});
