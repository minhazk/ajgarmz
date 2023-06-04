'use client';

import Carousel from '@/components/home/Carousel';
import CategorySelection from '@/components/home/CategorySelection';
import InfoBanner from '@/components/home/InfoBanner';
import Newsletter from '@/components/home/Newsletter';
import { api } from '@/util/trpc';

export default function Home() {
    const hello = api.example.hello.useQuery({ text: 'from tRPC' });
    console.log(hello);
    return (
        <>
            <Carousel />
            <InfoBanner />
            <CategorySelection />
            <Newsletter />
        </>
    );
}
