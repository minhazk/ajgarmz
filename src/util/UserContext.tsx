import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './trpc';
import { useSession } from 'next-auth/react';
import useLocalStorage from '@/hooks/useLocalStorage';

const UserContext = createContext<any>({});

export const useUserContext = () => useContext(UserContext);

type UserProviderType = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderType) => {
    const { getItemCount } = useLocalStorage();
    const { data: session, status } = useSession();
    const { data: authedBasketCount } = api.items.getUserBasketQuantity.useQuery(session?.user.id);
    const [basketCount, setBasketCount] = useState<number | undefined>(() => {
        if (status === 'authenticated' && typeof authedBasketCount !== 'string') {
            return authedBasketCount;
        } else return getItemCount() ?? 0;
    });

    useEffect(() => {
        if (status === 'authenticated' && typeof authedBasketCount !== 'string') {
            setBasketCount(authedBasketCount);
        }
    }, [status, authedBasketCount]);

    return <UserContext.Provider value={{ session, status, basketCount, setBasketCount }}>{children}</UserContext.Provider>;
};
