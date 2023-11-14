import currencyFormatter from '@/util/currencyFormat';
import { Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type ItemCardProps = {
    id: number;
    mainImage: {
        url: string;
    } | null;
    name: string;
    price: number;
    oldPrice: number | null;
    colours: { id: number; name: string }[];
};

export default function ItemCard({ id, mainImage, name, price, oldPrice, colours }: ItemCardProps) {
    const [isHovering, setHovering] = useState(false);

    return (
        <div
            className='rounded-md border border-gray-200 p-3 shadow shadow-transparent transition-all duration-700 hover:border-gray-400/30 hover:bg-slate-300/10 hover:shadow-lg relative overflow-hidden'
            onMouseEnter={() => {
                setTimeout(() => setHovering(true), 350);
            }}
            onMouseLeave={() => setTimeout(() => setHovering(false), 500)}
        >
            {oldPrice && (
                <div className='absolute top-0 left-0 z-10'>
                    <p className='font-medium text-xs md:text-sm bg-red-800 rounded py-1 px-4 m-2 flex justify-center items-center text-white'>{Math.round(((oldPrice - price) / oldPrice) * 100)}%</p>
                </div>
            )}
            <Link href={`/item/${id}`}>
                <div className='relative aspect-square overflow-hidden rounded-md'>
                    <Image src={mainImage!.url} fill className='object-cover' alt={name} />
                </div>
                <div className='mt-2 grid grid-cols-[1fr,auto] items-end gap-2'>
                    <p
                        className='overflow-hidden text-ellipsis text-xs font-semibold text-slate-500 sm:text-sm h-full'
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                    >
                        {name}
                    </p>
                    <p className='sm:text-md text-end text-sm font-bold text-slate-500 self-start'>{currencyFormatter(price)}</p>
                    <p className='text-xs text-slate-400 sm:text-sm'>{colours.length} colours</p>
                    {oldPrice != null && <p className='text-end text-xs text-orange-600 font-semibold line-through'>{currencyFormatter(oldPrice)}</p>}
                </div>
            </Link>

            {/* <div className={`mt-3 grid overflow-hidden transition-[grid-template-rows] ${isHovering ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-700`}>
                <div className='min-h-0'>
                    <div className='flex gap-1'>
                        <button
                            onClick={() => {}}
                            className='flex w-full items-center justify-center gap-2 rounded border border-slate-700 bg-slate-700 px-2 py-2 text-xs font-medium text-white transition-all duration-500 hover:opacity-75'
                        >
                            <Eye strokeWidth={2} size={19} /> Quick View
                        </button>
                        <button
                            onClick={() => {}}
                            className='justify-center gap-2 rounded border border-slate-700 bg-white p-2.5 text-xs font-medium text-slate-700 transition-all duration-500 hover:bg-slate-700 [&>svg]:hover:text-white'
                        >
                            <Heart strokeWidth={2} fill='white' size={18} className='transition-colors' />
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
