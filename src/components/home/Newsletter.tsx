import { Mail } from 'lucide-react';

export default function Newsletter() {
    return (
        <div className='my-7 flex flex-col items-center justify-center gap-3  py-3 text-center'>
            <h1 className='text-md font-semibold'>
                Subscribe to our newsletter to get updates <br></br> to our latests collections
            </h1>
            <p className='text-gray-60 mb-3 mt-1 text-xs font-medium'>Get 20% off on your first order by subscribing to our newsletter</p>
            <form className='flex h-10 rounded-md border border-gray-200 bg-gray-50'>
                <div className='flex items-center px-3 text-gray-400'>
                    <Mail size={20} />
                </div>
                <input type='email' placeholder='Enter your email' required className='bg-transparent text-sm outline-none' />
                <button type='submit' className='rounded bg-black px-4 text-sm text-white'>
                    Subscribe
                </button>
            </form>

            <p className='text-xs text-gray-400'>You are able to unsubscribe anytime</p>
        </div>
    );
}
