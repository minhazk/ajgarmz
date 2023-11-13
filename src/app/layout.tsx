import Footer from '@/components/ui/Footer';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from '@/components/ui/NavBar';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';
import { Analytics } from '@vercel/analytics/react';
import { ContextProviders } from '@/components/ContextProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Ajgarmz',
    description: 'Online clothing store',
    icons: {
        icon: ['/favicon.ico?v=4'],
        apple: ['./apple-touch-icon.png?v=4'],
        shortcut: ['./apple-touch-icon.png'],
    },
    manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            {process.env.NEXT_PUBLIC_GA_TRACKING_ID && <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID as string} />}
            <body className={`${inter.className} flex min-h-screen flex-col`}>
                <ContextProviders>
                    <div className='container mx-auto flex flex-grow flex-col px-5 sm:px-6 lg:px-12'>
                        <NavBar />
                        <div className='flex flex-grow flex-col'>{children}</div>
                    </div>
                </ContextProviders>
                <CookieBanner />
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
