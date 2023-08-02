import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='mt-6 bg-gray-800 px-4 text-white'>
            <div className='container mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 py-8 text-center sm:flex-row sm:px-10 sm:text-left md:gap-10 md:gap-3 lg:max-w-[90rem] lg:px-12'>
                <div>
                    <h2 className='text-semibold'>AjGarmz</h2>
                    <p className='mt-2 text-xs text-gray-200'>
                        Specializes in providing high-quality, stylish <br></br> products for your wardrobe
                    </p>
                </div>
                <div className='flex w-full flex-wrap justify-center gap-7 self-center text-xs md:w-[unset] md:flex-nowrap md:gap-10 md:self-auto'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='mb-1 font-semibold'>SHOP</h4>
                        <Link href='/shop'>All Collections</Link>
                        <Link href='/shop?category=sale'>Sale</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='mb-1 font-semibold'>SUPPORT</h4>
                        <a href='tel:+44 7185291273'>+44 7185291273</a>
                        <a href='mailto:customer_service@gmail.com'>customer_service@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className='relative py-5 text-center before:absolute before:left-1/2 before:top-0 before:h-px before:w-3/4 before:-translate-x-1/2 before:bg-gray-400'>
                <p className='text-xs text-gray-200'>Copyright © {new Date().getFullYear()} AjGarmz. All rights reserved</p>
            </div>
        </footer>
    );
}
