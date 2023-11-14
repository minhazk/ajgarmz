'use client';

import { UserProvider } from '@/util/UserContext';
import { TrpcProvider } from '@/util/trpc-provider';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function ContextProviders({ children }: { children: ReactNode }) {
    return (
        <TrpcProvider>
            <SessionProvider>
                <UserProvider>{children}</UserProvider>
            </SessionProvider>
        </TrpcProvider>
    );
}
