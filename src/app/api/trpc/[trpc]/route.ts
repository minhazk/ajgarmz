import { appRouter } from '@/server/api/root';
import { prisma } from '@/server/prisma';
import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { getToken } from 'next-auth/jwt';

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: async (opts: FetchCreateContextFnOptions): Promise<any> => {
            const session = await getToken({ req: opts.req } as any);
            console.log(session);
            return { opts, session, prisma };
        },
    });
};

export { handler as GET, handler as POST };
