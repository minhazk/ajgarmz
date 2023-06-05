import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

const ItemCreateInput = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    sizes: z.string().array(),
    gender: z.string(),
    colours: z.string().array(),
    category: z.string(),
    type: z.string(),
});

export const itemRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.item.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                oldPrice: true,
                mainImage: {
                    select: {
                        url: true,
                    },
                },
                colours: true,
            },
        });
    }),
    getItem: publicProcedure.input(z.number()).query(({ ctx, input: id }) => {
        return ctx.prisma.item.findUnique({
            where: { id },
            select: {
                name: true,
                description: true,
                price: true,
                oldPrice: true,
                sizes: true,
                colours: true,
                images: true,
                mainImage: true,
            },
        });
    }),
    createItem: publicProcedure.input(ItemCreateInput).mutation(({ ctx, input: { name, description, price, sizes, colours, gender, category, type } }) => {
        return ctx.prisma.item.create({
            data: {
                name,
                description,
                price,
                category,
                type,
                gender,
                images: {
                    createMany: { data: [{ url: 'https://source.unsplash.com/random/2' }] },
                },
                mainImage: {
                    create: { url: 'https://source.unsplash.com/random/2' },
                },
                colours: {
                    connectOrCreate: colours.map(colour => {
                        return {
                            where: { name: colour },
                            create: { name: colour },
                        };
                    }),
                },
                sizes: {
                    connectOrCreate: sizes.map(size => {
                        return {
                            where: { name: size },
                            create: { name: size },
                        };
                    }),
                },
            },
        });
    }),
});
