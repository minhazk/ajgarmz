'use client';

import NotAuthorised from '@/components/ui/NotAuthorised';
import { useSession } from 'next-auth/react';

export default function Layout({ children }: any) {
    const { data: session } = useSession();

    if (!session?.user || session.user.type !== 'admin') return <NotAuthorised />;

    return <div>{children}</div>;
}
