'use client';

import { getLocalStorage, setLocalStorage } from '@/lib/localStorageHelper';
import { useEffect, useState } from 'react';
import CustomButton from './ui/CustomButton';

export default function CookieBanner() {
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect(() => {
        const storedCookieConsent = getLocalStorage('cookie_consent', null);
        setCookieConsent(storedCookieConsent);
    }, [setCookieConsent]);

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied';

        window.gtag('consent', 'update', {
            analytics_storage: newValue,
        });

        setLocalStorage('cookie_consent', cookieConsent);

        console.log('Cookie Consent: ', cookieConsent);
    }, [cookieConsent]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0
                        mx-auto my-12 max-w-max md:max-w-screen-sm 
                        ${cookieConsent != null ? 'hidden' : 'flex'} flex-col items-center justify-between gap-4 rounded-lg border border-slate-600 bg-white px-5 py-3  
                         shadow sm:flex-row md:px-5`}
        >
            <div className='text-center text-sm sm:text-base'>
                <p>
                    We use <span className='font-bold text-slate-500'>cookies</span> on our site.
                </p>
            </div>

            <div className='flex gap-2'>
                <button className='rounded-md border border-slate-600 px-5 py-2 text-sm text-slate-700 transition-opacity hover:opacity-75' onClick={() => setCookieConsent(false)}>
                    Decline
                </button>
                <CustomButton onClick={() => setCookieConsent(true)}>Allow Cookies</CustomButton>
            </div>
        </div>
    );
}
