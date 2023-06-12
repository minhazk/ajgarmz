import Link from 'next/link';
import CustomButton from './CustomButton';

export default function Error404() {
    return (
        <div className='mx-auto my-8 max-w-lg text-center'>
            <h1 className='my-4 text-base font-medium text-slate-600'>Something went wrong! We couldn&apos;t find what you requested</h1>
            <CustomButton>
                <Link href='/'>Go back home</Link>
            </CustomButton>
        </div>
    );
}
