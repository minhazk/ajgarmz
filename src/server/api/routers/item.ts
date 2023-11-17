import { adminProcedure, authedProcedure, createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

const itemCreateInput = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    sizes: z.string().array(),
    gender: z.string(),
    colours: z.string().array(),
    category: z.string(),
    type: z.string(),
    images: z
        .object({
            url: z.string(),
            colour: z.string().optional(),
        })
        .array(),
    mainImage: z.object({
        url: z.string(),
        colour: z.string().optional(),
    }),
});

const basketItemInput = z.object({
    userId: z.string(),
    itemId: z.number(),
    sizeId: z.number(),
    colourId: z.number(),
    quantity: z.number(),
});

const getItemsInput = z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.number().nullish(),
    filters: z.object({
        Gender: z.string().array().optional(),
        Category: z.string().array().optional(),
        Department: z.string().array().optional(),
        Sale: z.string().array().optional(),
    }),
    searchParam: z.string().optional(),
});

export const itemRouter = createTRPCRouter({
    getAll: publicProcedure.input(getItemsInput).query(async ({ ctx, input }) => {
        const limit = input.limit ?? 50;
        const {
            cursor,
            filters: { Gender, Category, Department, Sale },
        } = input;

        const filters: {
            gender?: { in: string[] };
            category?: { is: { name: { in: string[] } } };
            type?: { in: string[] };
            oldPrice?: { not: null };
        } = {};

        // gender filter eg. men, women, unisex
        if (Gender != undefined && Gender.length !== 0) {
            if (Gender.length === 1) {
                filters.gender = { in: [Gender[0], 'unisex'] };
            } else {
                filters.gender = { in: ['unisex'] };
            }
        }

        // category filter eg. hoodies, jackets, shorts etc...
        if (Category != undefined && Category.length !== 0) {
            filters.category = { is: { name: { in: Category } } };
        }

        // department filter eg. clothing, accessory, footwear
        if (Department != undefined && Department.length !== 0) {
            filters.type = { in: Department };
        }

        // sale filter
        if (Sale != undefined && Sale.length !== 0) {
            filters.oldPrice = { not: null };
        }

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
            where: filters,
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
                images: {
                    select: {
                        id: true,
                        url: true,
                        colour: true,
                    },
                },
                mainImage: {
                    select: {
                        id: true,
                        url: true,
                        colour: true,
                    },
                },
            },
        });
    }),
    getCategories: publicProcedure.output(z.object({ id: z.number(), name: z.string() }).array()).query(({ ctx }) => {
        return ctx.prisma.category.findMany();
    }),
    createItem: adminProcedure.input(itemCreateInput).mutation(({ ctx, input: { name, description, price, sizes, colours, gender, category, type, images, mainImage } }) => {
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
                    createMany: { data: images },
                },
                mainImage: {
                    create: { url: mainImage.url, colour: mainImage.colour },
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
    getUserItems: authedProcedure.input(z.string().nullish()).query(({ ctx, input: id }) => {
        if (id == null) return [];
        return ctx.prisma.basketItem.findMany({
            where: { userId: id },
            select: {
                item: {
                    select: {
                        id: true,
                        mainImage: {
                            select: {
                                url: true,
                            },
                        },
                        name: true,
                        price: true,
                        oldPrice: true,
                    },
                },
                size: { select: { id: true, name: true } },
                colour: { select: { id: true, name: true } },
                quantity: true,
            },
        });
    }),
    getUserBasketQuantity: authedProcedure.input(z.string().nullish()).query(async ({ ctx, input: id }) => {
        if (id == null) return 'Not logged in';
        const items = await ctx.prisma.basketItem.findMany({
            where: { userId: id },
            select: {
                quantity: true,
            },
        });
        return items.length + items.reduce((prev, curr) => curr.quantity + prev - 1, 0);
    }),
    updateItemQuantity: authedProcedure
        .input(z.object({ userId: z.string(), itemId: z.number(), sizeId: z.number(), colourId: z.number(), quantity: z.number() }))
        .mutation(({ ctx, input: { userId, itemId, sizeId, colourId, quantity } }) => {
            return ctx.prisma.basketItem.update({
                where: {
                    itemId_userId_colourId_sizeId: { itemId, userId, colourId, sizeId },
                },
                data: {
                    quantity,
                },
            });
        }),
    addToBasket: authedProcedure.input(basketItemInput).mutation(({ ctx, input: { userId, itemId, sizeId, colourId, quantity } }) => {
        return ctx.prisma.basketItem.upsert({
            where: { itemId_userId_colourId_sizeId: { itemId, userId, colourId, sizeId } },
            update: { quantity: { increment: quantity } },
            create: {
                user: { connect: { id: userId } },
                item: { connect: { id: itemId } },
                colour: { connect: { id: colourId } },
                size: { connect: { id: sizeId } },
                quantity,
            },
        });
    }),
    removeItemFromBasket: authedProcedure
        .input(z.object({ userId: z.string(), itemId: z.number(), sizeId: z.number(), colourId: z.number(), quantity: z.number() }))
        .mutation(({ ctx, input: { userId, itemId, sizeId, colourId, quantity } }) => {
            if (quantity === 1) {
                return ctx.prisma.basketItem.delete({
                    where: {
                        itemId_userId_colourId_sizeId: { itemId, userId, colourId, sizeId },
                    },
                });
            }
            return ctx.prisma.basketItem.update({
                where: {
                    itemId_userId_colourId_sizeId: { itemId, userId, colourId, sizeId },
                },
                data: {
                    quantity: quantity - 1,
                },
            });
        }),
    clearUserBasket: authedProcedure.input(z.string()).mutation(({ ctx, input: userId }) => {
        return ctx.prisma.basketItem.deleteMany({
            where: { userId },
        });
    }),
    searchItems: publicProcedure.input(z.string().nullable()).query(({ ctx, input: searchInput }) => {
        if (searchInput == '') return null;
        return ctx.prisma.$queryRaw`
            SELECT id, name, price, oldPrice FROM Item
            WHERE name LIKE ${`%${searchInput}%`}
        `;
    }),
});
