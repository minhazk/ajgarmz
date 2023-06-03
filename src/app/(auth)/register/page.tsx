'use client';

import AuthForm from '@/components/ui/AuthForm';
import CustomButton from '@/components/ui/CustomButton';
import FormInput from '@/components/ui/FormInput';
import { signIn, useSession } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Page() {
    const { data: session } = useSession();
    console.log(1, session);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const name = form.get('full name');
        const email = form.get('email');
        const password = form.get('password');
        const rePassword = form.get('confirm password');
        if (name === '' || email === '' || password === '' || rePassword === '') return alert('Please fill in all fields');
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        if (res.ok) {
            (e.target as HTMLFormElement).reset();
            signIn('credentials', {
                email,
                password,
                callbackUrl: '/',
            });
        }
    };

    return (
        <AuthForm title='Sign up'>
            <form onSubmit={handleSubmit}>
                <AuthForm.FormContent>
                    <FormInput label='Full Name' />
                    <FormInput label='Email' type='email' />
                    <FormInput label='Password' type='password' />
                    <FormInput label='Confirm Password' type='password' />
                    <div className='mt-5'>
                        <CustomButton>Create Account</CustomButton>
                    </div>
                </AuthForm.FormContent>
            </form>
            <AuthForm.FormFooter>
                Already have an account?{' '}
                <button onClick={() => signIn()} className='font-medium underline'>
                    Sign in
                </button>
            </AuthForm.FormFooter>
        </AuthForm>
    );
}
