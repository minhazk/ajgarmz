import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

const ItemCreateInput = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    sizes: z.string().array(),
    colours: z.string().array(),
    category: z.string(),
    type: z.string(),
});

type ItemCreateInputProps = {
    name: string;
    description: string;
    price: number;
    sizes: string[];
    colours: string[];
    category: string;
    type: string;
};

export const itemRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.item.findMany();
    }),
    createItem: protectedProcedure.input(ItemCreateInput).mutation(({ ctx, input }) => {
        console.log(input);
        // return ctx.prisma.item.create({
        //     data: {

        //     }
        // })
        return { hello: 'wag1' };
    }),
});
