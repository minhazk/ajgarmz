'use client';

import Footer from '@/components/ui/Footer';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/ui/NavBar';
import { SessionProvider } from 'next-auth/react';
import { TrpcProvider } from '@/util/trpc-provider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            {process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID as string} />}
            <body className={`${inter.className} flex min-h-screen flex-col`}>
                <SessionProvider>
                    <TrpcProvider>
                        <div className='container mx-auto flex flex-grow flex-col px-5 sm:px-6 lg:px-12'>
                            <NavBar />
                            <div className='flex flex-grow flex-col'>{children}</div>
                        </div>
                    </TrpcProvider>
                </SessionProvider>
                <CookieBanner />
                <Footer />
            </body>
        </html>
    );
}
