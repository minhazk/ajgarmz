'use client';

import { TrpcProvider } from '@/util/trpc-provider';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function ContextProviders({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <TrpcProvider>{children}</TrpcProvider>
        </SessionProvider>
    );
}
