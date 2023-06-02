'use client';

import Carousel from '@/components/home/Carousel';
import CategorySelection from '@/components/home/CategorySelection';
import InfoBanner from '@/components/home/InfoBanner';
import Newsletter from '@/components/home/Newsletter';
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data } = useSession();
    console.log(data);

    return (
        <>
            <Carousel />
            <InfoBanner />
            <CategorySelection />
            <Newsletter />
        </>
    );
}
