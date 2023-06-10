'use client';

import CustomButton from '@/components/ui/CustomButton';
import Link from 'next/link';
import FormInput from '@/components/ui/FormInput';
import AuthForm from '@/components/ui/AuthForm';
import { FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { showToast } from '@/util/toastNotification';

export default function Page({ searchParams: { error } }: any) {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        if (email === '' || password === '') return showToast('Please fill in all the fields');
        signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
        });
    };

    return (
        <AuthForm title='Sign in'>
            <form onSubmit={handleSubmit}>
                <AuthForm.FormContent>
                    <FormInput label='Email' type='email' />
                    <FormInput label='Password' type='password' />
                    <div className='mt-5'>
                        <CustomButton>Sign in</CustomButton>
                    </div>
                </AuthForm.FormContent>
            </form>
            <AuthForm.FormFooter>
                Don&apos;t have an account?{' '}
                <Link href='/register' className='font-medium underline'>
                    Sign up
                </Link>
            </AuthForm.FormFooter>
            {error && <AuthForm.Error>There was an error signing in your account</AuthForm.Error>}
        </AuthForm>
    );
}
