'use client';

import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import dummy_tee from '../../assets/dummy_tee.jpg';
import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import CustomButton from '@/components/ui/CustomButton';

export default function Page() {
    const { data: session } = useSession();
    const { data: items } = api.items.getUserItems.useQuery(session?.user?.id ?? null);
    if (session?.user?.id == null) return <div>not logged in</div>;
    console.log(items);

    return (
        <>
            <NavigationHistory routes={['Basket']} />
            <div className='flex flex-col gap-5 md:flex-row md:gap-16'>
                <div className='my-6 flex flex-col gap-3 md:w-[60%]'>
                    {items?.map(({ item, colour, size, quantity }, i) => (
                        <div key={i} className='flex items-center gap-2 sm:gap-5'>
                            <div className='relative aspect-square min-w-[92px] overflow-hidden rounded-md sm:min-w-[96px]'>
                                <Image src={dummy_tee} fill className='object-cover' alt={item.name} />
                            </div>
                            <div className='flex flex-grow flex-col gap-1'>
                                <p
                                    className='overflow-hidden text-ellipsis text-sm font-semibold text-slate-600 first-letter:uppercase sm:text-base'
                                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                                >
                                    {item.name}
                                </p>
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
                        </div>
                    ))}
                </div>

                <div className='md:w-[40%]'>
                    <h1 className='mb-4 text-xl font-semibold text-slate-600'>Summary</h1>
                    <div className='grid grid-cols-2 gap-3 text-slate-700'>
                        <p className='text-sm font-medium sm:text-base'>Subtotal</p>
                        <p className='justify-self-end text-sm sm:text-base'>{currencyFormatter(items?.reduce((prev, curr) => prev + curr.item.price * curr.quantity, 0) ?? 0)}</p>
                        <p className='text-sm font-medium sm:text-base'>Total</p>
                        <p className='justify-self-end text-sm sm:text-base'>{currencyFormatter(items?.reduce((prev, curr) => prev + curr.item.price * curr.quantity, 0) ?? 0)}</p>
                        <div className='col-span-2 my-3 h-px bg-gray-200'></div>
                        <div className='col-span-2'>
                            <CustomButton>Stripe</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
