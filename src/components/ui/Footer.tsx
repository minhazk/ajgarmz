import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='mt-6 bg-gray-800 px-4 text-white'>
            <div className='container mx-auto flex flex-col items-center justify-between gap-10 py-8 text-center md:flex-row md:gap-3 md:text-left'>
                <div>
                    <h2 className='text-semibold'>AjGarmz</h2>
                    <p className='mt-2 text-xs text-gray-200'>
                        Specializes in providing high-quality, stylish <br></br> products for your wardrobe
                    </p>
                </div>
                <div className='flex flex-wrap justify-center gap-10 self-center text-xs md:flex-nowrap md:self-auto'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='mb-1 font-semibold'>SHOP</h4>
                        <Link href='/shop'>All Collections</Link>
                        <Link href='/shop?sale'>Special Edition</Link>
                        <Link href='/shop?sale'>Sale</Link>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='mb-1 font-semibold'>SUPPORT</h4>
                        <Link href='/'>FAQs</Link>
                        <a href='tel:+44 7185291273'>+44 7185291273</a>
                        <a href='mailto:support@ajgarmz.com'>support@ajgarmz.com</a>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h4 className='mb-1 font-semibold'>SUPPORT</h4>
                        <Link href='/'>FAQs</Link>
                        <Link href='/'>+44 7185291273</Link>
                        <Link href='/'>support@ajgarmz.com</Link>
                    </div>
                </div>
            </div>
            <div className='relative py-5 text-center before:absolute before:left-1/2 before:top-0 before:h-px before:w-3/4 before:-translate-x-1/2 before:bg-gray-400'>
                <p className='text-xs text-gray-200'>Copyright © {new Date().getFullYear()} AjGarmz. All rights reserved</p>
            </div>
        </footer>
    );
}
