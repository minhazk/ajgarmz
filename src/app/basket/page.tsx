'use client';

import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: session } = useSession();
    if (session?.user?.id == null) return <div>not logged in</div>;
    const { data: items } = api.items.getUserItems.useQuery(session.user.id);
    console.log(items);

    return <div></div>;
}
