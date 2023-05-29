import Image from 'next/image';
import carousel from '../../assets/carousel-1.jpg';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Carousel() {
    return (
        <div className='bg-black-300 relative mt-4 h-96 overflow-hidden rounded-lg border border-black'>
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[rgb(0,0,0,0.4)] text-center'>
                <h3 className='mx-5 text-3xl font-semibold text-white'>
                    Level up your style with our<br></br>summer collections
                </h3>
                <Link href='/shop' className='mt-4 flex items-center justify-center gap-2 rounded bg-white px-5 py-2 text-sm font-semibold'>
                    Shop now
                    <ArrowRight size={17} />
                </Link>
            </div>
            <Image src={carousel} fill alt='model' className='absolute inset-0 -z-10 object-cover' />
        </div>
    );
}
