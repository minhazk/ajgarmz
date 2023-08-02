'use client';

import Carousel from '@/components/home/Carousel';
import CategorySelection from '@/components/home/CategorySelection';
import InfoBanner from '@/components/home/InfoBanner';
import Newsletter from '@/components/home/Newsletter';
import { initGA, logPageView } from '@/lib/analytics';
import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        initGA();
        logPageView();
    }, []);

    return (
        <>
            <Carousel />
            <InfoBanner />
            <CategorySelection />
            <Newsletter />
        </>
    );
}
