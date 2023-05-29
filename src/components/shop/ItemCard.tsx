import currencyFormatter from '@/util/currencyFormat';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type ItemCardProps = {
    id: number;
    mainImage: StaticImageData;
    name: string;
    price: number;
    oldPrice?: number;
    colours: Array<string>;
};

export default function ItemCard({ id, mainImage, name, price, oldPrice, colours }: ItemCardProps) {
    return (
        <Link href={`/shop/${id}`} className='rounded-md border border-gray-100 p-3'>
            <div className='relative aspect-square overflow-hidden rounded-md'>
                <Image src={mainImage} fill className='object-cover' alt={name} />
            </div>
            <div className='mt-2 grid grid-cols-[1fr,auto] items-end gap-2'>
                <p className='overflow-hidden text-ellipsis text-xs font-semibold text-slate-500 sm:text-sm' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {name}
                </p>
                <p className='sm:text-md text-sm font-bold text-slate-500'>{currencyFormatter(price)}</p>
                <p className='text-xs text-slate-400 sm:text-sm'>{colours.length} colours</p>
                {oldPrice != null && <p className='text-xs text-gray-400 line-through'>{currencyFormatter(oldPrice)}</p>}
            </div>
        </Link>
    );
}
