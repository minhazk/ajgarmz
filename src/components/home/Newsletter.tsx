'use client';

import { Mail } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { FormEvent } from 'react';
import { showToast } from '@/util/toastNotification';
import { api } from '@/util/trpc';

export default function Newsletter() {
    const subscribe = api.emailSubscriptions.subscribeEmail.useMutation({
        onSuccess() {
            showToast('Your email has been registered to our newsletter');
        },
        onError(err) {
            showToast(err.message);
            console.log(err);
        },
    });

    async function handleEmailSubscription(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get('email') as string;
        if (email === '') return showToast('Please enter a valid email');
        try {
            await subscribe.mutateAsync(email);
        } catch (e) {}
        if (subscribe.isSuccess) {
            form.reset();
        }
    }

    return (
        <div className='mb-12 mt-8 flex flex-col items-center justify-center gap-3 py-3  text-center sm:mt-8'>
            <h1 className='text-md font-bold sm:text-2xl'>
                Subscribe to our newsletter to get updates <br></br> to our latests collections
            </h1>
            <p className='text-gray-60 mb-3 mt-1 text-xs font-medium'>Get 20% off on your first order by subscribing to our newsletter</p>
            <form onSubmit={handleEmailSubscription} className='flex h-10 max-w-md rounded-md border border-gray-200 bg-gray-50  md:w-full'>
                <div className='flex items-center px-3 text-gray-400'>
                    <Mail size={20} />
                </div>
                <input
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className={`bg-transparent pr-2 text-xs text-slate-500 outline-none sm:w-full sm:text-sm ${subscribe.isLoading && 'disabled:opacity-75'}`}
                />
                <div>
                    <CustomButton type='submit' disabled={subscribe.isLoading}>
                        Subscribe
                    </CustomButton>
                </div>
            </form>

            <p className='text-xs text-gray-400'>You are able to unsubscribe anytime</p>
        </div>
    );
}
