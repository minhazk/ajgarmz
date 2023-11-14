import { useUserContext } from '@/util/UserContext';
import currencyFormatter from '@/util/currencyFormat';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export type BasketItemProps = {
    item: {
        mainImage: {
            url: string;
        } | null;
        name: string;
        oldPrice: number | null;
        price: number;
        id: number;
    };
    colour: { id?: number; name: string };
    size: { id?: number; name: string };
    quantity: number;
    removeItem: (data: removeItemProps) => void;
    loading: boolean;
};

export type removeItemProps = {
    colour: { id?: number; name: string };
    size: { id?: number; name: string };
    itemId: number;
    quantity: number;
};

export default function BasketItem({ item, colour, size, quantity, removeItem, loading }: BasketItemProps) {
    const { setBasketCount } = useUserContext();

    const handleRemoveItem = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        removeItem({ itemId: item.id, colour, size, quantity });
        setBasketCount((prev: number) => (prev -= 1));
    };

    return (
        <div className='peer flex w-full items-center gap-2 text-left sm:gap-5'>
            <div className='relative aspect-square min-w-[92px] overflow-hidden rounded-md sm:min-w-[96px]'>
                <Image src={item.mainImage!.url} fill className='object-cover' alt={item.name} />
            </div>
            <div className='flex flex-grow flex-col gap-1'>
                <Link
                    href={`/item/${item.id}`}
                    className='overflow-hidden text-ellipsis text-sm font-semibold text-slate-600 first-letter:uppercase hover:underline sm:text-base'
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                >
                    {item.name}
                </Link>
                <div className='flex flex-col text-xs sm:text-sm'>
                    <p className='text-slate-500'>
                        Colour:<span className='mx-2 font-semibold'>{colour.name}</span>
                    </p>
                    <p className='text-slate-500'>
                        Size:<span className='mx-2 font-semibold'> {size.name}</span>
                    </p>
                </div>
            </div>
            <div className='flex min-w-[95px] flex-col items-center gap-2'>
                <p className='text-sm font-medium text-slate-600 sm:text-sm'>
                    {item.oldPrice != null && <span className='mr-2 text-xs text-slate-400 line-through'>{currencyFormatter(item.oldPrice)}</span>}
                    {currencyFormatter(item.price)}
                </p>
                <p className='font-semibold text-slate-600'>
                    <span className='mr-1 text-xs font-light text-slate-500'>x{quantity}</span>
                    {currencyFormatter(item.price * quantity)}
                </p>
            </div>
            <button onClick={handleRemoveItem} disabled={loading} className='p-1 text-gray-500 hover:text-red-400'>
                <X size={16} />
            </button>
        </div>
    );
}
