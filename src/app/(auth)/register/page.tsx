'use client';

import AuthForm from '@/components/ui/AuthForm';
import CustomButton from '@/components/ui/CustomButton';
import FormInput from '@/components/ui/FormInput';
import { showToast } from '@/util/toastNotification';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

export default function Page() {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('full name');
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('confirm password');
        if (name === '' || email === '' || password === '' || rePassword === '') return showToast('Please fill in all fields');
        if (password !== rePassword) return showToast('Passwords do not match');
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
        if (res.status === 403) {
            showToast('There is already an existing an account with that email address');
        } else if (res.status === 500) {
            showToast('There was an error creating your account');
        } else if (res.ok) {
            form.reset();
            signIn('credentials', {
                email,
                password,
                callbackUrl: '/',
            }).then(res => {
                if (res?.ok) {
                    showToast('Account created');
                    form.reset();
                }
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
                        <CustomButton type='submit'>Create Account</CustomButton>
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
