import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/prisma';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getToken } from 'next-auth/jwt';

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: async (opts: CreateNextContextOptions) => {
            const session = await getToken({ req: opts.req });
            return { opts, session, prisma };
        },
    });
};

export { handler as GET, handler as POST };
