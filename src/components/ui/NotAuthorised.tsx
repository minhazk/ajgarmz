import Link from 'next/link';
import CustomButton from './CustomButton';

export default function NotAuthorised() {
    return (
        <div className='mx-auto my-8 max-w-lg text-center'>
            <h1 className='my-4 text-base font-semibold text-slate-600'>You are not authorised to access this page</h1>
            <CustomButton>
                <Link href='/'>Go back home</Link>
            </CustomButton>
        </div>
    );
}
