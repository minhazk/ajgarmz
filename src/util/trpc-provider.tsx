import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, getFetch, loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { api as trpc } from './trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
    });

    const url = process.env.NEXT_PUBLIC_DOMAIN_UR ? `https://${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/trpc` : '/api/trpc/';

    const trpcClient = trpc.createClient({
        links: [
            loggerLink({
                enabled: () => true,
            }),
            httpBatchLink({
                url,
                fetch: async (input, init?) => {
                    const fetch = getFetch();
                    return fetch(input, {
                        ...init,
                        credentials: 'include',
                    });
                },
            }),
        ],
        transformer: superjson,
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </trpc.Provider>
    );
};
