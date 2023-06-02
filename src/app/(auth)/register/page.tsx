import AuthForm from '@/components/ui/AuthForm';
import CustomButton from '@/components/ui/CustomButton';
import FormInput from '@/components/ui/FormInput';
import Link from 'next/link';

export default function Page() {
    return (
        <AuthForm title='Sign up'>
            <form>
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
                Already have an account?
                <Link href='/signIn' className='font-medium underline'>
                    Sign in
                </Link>
            </AuthForm.FormFooter>
        </AuthForm>
    );
}
