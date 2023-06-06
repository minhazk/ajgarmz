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
    getAll: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.number().nullish(),
                filters: z.object({
                    Gender: z.string().array().optional(),
                    Category: z.string().array().optional(),
                    Department: z.string().array().optional(),
                }),
            })
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;
            const {
                cursor,
                filters: { Gender, Category, Department },
            } = input;
            const items = await ctx.prisma.item.findMany({
                take: limit + 1,
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
                // where: {
                //     gender: { in: Gender ?? [] }
                // },
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    id: 'desc',
                },
            });
            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem!.id;
            }
            return {
                items,
                nextCursor,
            };
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
    getCategories: publicProcedure.output(z.object({ id: z.number(), name: z.string() }).array()).query(({ ctx }) => {
        return ctx.prisma.category.findMany();
    }),
    createItem: publicProcedure.input(ItemCreateInput).mutation(({ ctx, input: { name, description, price, sizes, colours, gender, category, type } }) => {
        return ctx.prisma.item.create({
            data: {
                name,
                description,
                price,
                type,
                gender,
                category: {
                    connectOrCreate: {
                        where: { name: category },
                        create: { name: category },
                    },
                },
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
