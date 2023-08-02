'use client';

import Loading from '@/components/ui/Loading';
import NotAuthorised from '@/components/ui/NotAuthorised';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: any) {
    const { data: session, status } = useSession();

    if (status === 'loading') return <Loading />;

    if (!session?.user || session?.user.type !== 'admin') return <NotAuthorised />;

    return <div>{children}</div>;
}
