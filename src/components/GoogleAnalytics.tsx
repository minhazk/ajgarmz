'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { pageview } from '../lib/gtagHelper';

type GoogleAnalyticsTypes = {
    GA_MEASUREMENT_ID: string;
};

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsTypes) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + searchParams.toString();

        pageview(GA_MEASUREMENT_ID, url);
    }, [pathname, searchParams, GA_MEASUREMENT_ID]);

    return (
        <>
            <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script
                id='google-analytics'
                strategy='afterInteractive'
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
                }}
            />
        </>
    );
}
