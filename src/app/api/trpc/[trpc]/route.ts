import { appRouter } from '@/server/api/root';
import { FetchCreateContextFnOptions, fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (request: Request) => {
    console.log(`incoming request ${request.url}`);
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: (opts: any): any => {
            return {};
        },
    });
};

export { handler as GET, handler as POST };
