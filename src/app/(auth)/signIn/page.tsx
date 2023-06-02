import CustomButton from '@/components/ui/CustomButton';
import Link from 'next/link';
import FormInput from '@/components/ui/FormInput';
import AuthForm from '@/components/ui/AuthForm';

export default function Page() {
    return (
        <AuthForm title='Sign in'>
            <form>
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
        </AuthForm>
    );
}
