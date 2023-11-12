'use client';

import CustomButton from '@/components/ui/CustomButton';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { showToast } from '@/util/toastNotification';
import { api } from '@/util/trpc';
import { FormEvent, useState } from 'react';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);

    const { data } = api.emailSubscriptions.getEmails.useQuery();

    async function handleSendMail(e: FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const subject = formData.get('subject') as string;
        const body = formData.get('body') as string;
        setIsLoading(true);

        const recipients = data?.map(re => re.email);
        console.log(recipients);

        const res = await fetch('/api/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipients, subject, body }),
        });
        if (res.ok) {
            form.reset();
            showToast('Email sent!');
        } else {
            showToast('There was an error sending your email');
        }
        setIsLoading(false);
    }

    return (
        <div>
            <NavigationHistory routes={['admin', 'email']} />

            <h1 className='mt-2 text-lg font-medium text-slate-600'>Send an email</h1>
            <p className='mb-4 text-xs text-slate-400 md:text-sm'>Email sent out to all Ajgarmz newsletter subscribers</p>

            <form onSubmit={handleSendMail}>
                <div className='my-4 flex flex-col gap-2'>
                    <label className='pl-1 text-sm font-medium text-slate-600' htmlFor='subject'>
                        Subject
                    </label>
                    <input
                        id='subject'
                        name='subject'
                        className='rounded-md border border-gray-300 px-3 py-2 text-sm text-slate-500 outline-none transition-colors focus-within:border-slate-400'
                        placeholder='Type here'
                    />
                </div>
                <div className='my-4 flex flex-col gap-2'>
                    <label className='pl-1 text-sm font-medium text-slate-600' htmlFor='body'>
                        Body
                    </label>
                    <textarea
                        id='body'
                        name='body'
                        className='h-72 rounded-md border border-gray-300 px-3 py-2 text-sm text-slate-500 outline-none transition-colors focus-within:border-slate-400'
                        placeholder='Type here'
                    ></textarea>
                </div>
                <div className='mx-auto flex w-fit justify-center'>
                    <CustomButton type='submit' disabled={isLoading}>
                        Send Bulk Mail
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}
