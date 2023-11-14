'use client';

import { useUserContext } from '@/util/UserContext';
import currencyFormatter from '@/util/currencyFormat';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

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
    updateQuantity: (data: removeItemProps) => void;
    loading: boolean;
};

export type removeItemProps = {
    colour: { id?: number; name: string };
    size: { id?: number; name: string };
    itemId: number;
    quantity: number;
};

export default function BasketItem({ item, colour, size, quantity, removeItem, updateQuantity, loading }: BasketItemProps) {
    const { setBasketCount } = useUserContext();
    const [amount, setAmount] = useState(quantity);

    const handleRemoveItem = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        removeItem({ itemId: item.id, colour, size, quantity });
        setBasketCount((prev: number) => (prev -= 1));
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        e.stopPropagation();
        const newAmount = Number(e.target.value);
        setAmount(newAmount);
        updateQuantity({ itemId: item.id, colour, size, quantity: newAmount });
    };

    return (
        <>
            <div className='relative aspect-square w-[70px] overflow-hidden rounded-md sm:min-w-[96px] self-start'>
                <Image src={item.mainImage!.url} fill className='object-cover' alt={item.name} />
            </div>
            <div className='flex flex-grow flex-col xl:gap-1 self-start'>
                <Link
                    href={`/item/${item.id}`}
                    className='overflow-hidden text-ellipsis text-xs xl:text-lg font-semibold text-slate-600 first-letter:uppercase hover:underline sm:text-base'
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                >
                    {item.name}
                </Link>
                <div className='flex flex-col xl:flex-row xl:gap-2 text-xs sm:text-sm'>
                    <p className='text-slate-500'>
                        Colour:<span className='mx-2 font-semibold capitalize'>{colour.name}</span>
                    </p>
                    <p className='text-slate-500'>
                        Size:<span className='mx-2 font-semibold'> {size.name}</span>
                    </p>
                </div>
                <div className='flex items-center gap-2 text-xs sm:text-sm xl:mt-2'>
                    <p className='text-slate-500'>Quantity</p>
                    <select onChange={handleQuantityChange} className='border border-gray-300 md:py-1 md:px-2 rounded-sm md:rounded-md w-fit'>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <option key={i} selected={i + 1 === amount}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='text-xs md:text-sm flex flex-col items-center gap-1 justify-center'>
                <p className='font-medium text-slate-600 sm:text-sm'>
                    {item.oldPrice != null && <span className='text-xs text-orange-600 font-medium line-through'>{currencyFormatter(item.oldPrice)}</span>}
                </p>
                <p className='font-semibold text-slate-600'>{currencyFormatter(item.price)}</p>
            </div>
            <div className='text-xs md:text-sm flex flex-col items-center gap-2'>
                <p className='font-semibold text-slate-600'>{currencyFormatter(item.price * quantity)}</p>
            </div>
            <button onClick={handleRemoveItem} disabled={loading} className='p-1 text-gray-500 hover:text-red-400'>
                <X size={16} />
            </button>
        </>
    );
}
