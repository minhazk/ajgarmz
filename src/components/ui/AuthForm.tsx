import Image from 'next/image';
import { ReactNode } from 'react';
import dummyImage from '../../assets/carousel-1.jpg';

type AuthFormProps = {
    title: string;
    children: ReactNode;
};

export default function AuthForm({ title, children }: AuthFormProps) {
    return (
        <div className='flex flex-grow gap-4'>
            <div className='relative hidden w-full lg:block'>
                <Image src={dummyImage} alt='login' fill className='h-96 object-cover' />
            </div>

            <div className='mx-auto my-10 w-full max-w-2xl self-center px-4 py-2'>
                <h1 className='mb-8 text-center text-2xl font-semibold text-slate-600 md:text-3xl lg:text-start'>{title}</h1>
                {children}
            </div>
        </div>
    );
}

type FormContentProps = {
    children: ReactNode;
};

AuthForm.FormContent = function FormContent({ children }: FormContentProps) {
    return <div className='my-4 flex flex-col gap-4'>{children}</div>;
};

AuthForm.FormFooter = function FormContent({ children }: FormContentProps) {
    return <p className='mt-4 text-center text-xs text-slate-500'>{children}</p>;
};
