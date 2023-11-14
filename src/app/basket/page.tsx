'use client';

import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';
import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import CustomButton from '@/components/ui/CustomButton';
import BasketItem, { removeItemProps } from '@/components/basket/BasketItem';
import { showToast } from '@/util/toastNotification';
import { BadgeCheck, Cookie, Loader2, Lock, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

type PageProps = {
    searchParams: {
        order: string;
    };
};

export default function Page({ searchParams: { order } }: PageProps) {
    const { data: session, status } = useSession();
    const { data: items, refetch } = api.items.getUserItems.useQuery(session?.user?.id ?? null, {
        refetchOnMount: true,
    });
    const clearBasket = api.items.clearUserBasket.useMutation();
    const { push } = useRouter();
    const { items: localStorageItems, removeItem: removeLocalStorageItem, clearItems, updateItemQuantity: updateLocalStorageItemQuantity } = useLocalStorage();
    const [basketItems, setBasketItems] = useState<any>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            setBasketItems(localStorageItems);
        } else if (status === 'authenticated') {
            setBasketItems(items);
        }
    }, [status, items, basketItems, localStorageItems]);

    useEffect(() => {
        (async () => {
            if (order == null) return;
            if (status === 'loading') return;
            if (order == 'success') {
                showToast('Your order has been placed. Your items will be dispatched as soon as possible');
                if (status === 'unauthenticated') {
                    clearItems();
                } else {
                    await clearBasket.mutateAsync(session!.user.id);
                    refetch();
                }
                push('/basket');
            }
        })();
    }, [order, status, refetch]);

    const removeItem = api.items.removeItemFromBasket.useMutation({
        onSuccess() {
            showToast('Item removed from basket');
        },
        onError() {
            showToast('There was an error removing your item.');
        },
    });

    const updateItemQuantity = api.items.updateItemQuantity.useMutation({
        onError() {
            showToast('There was an error updating your item');
        },
    });

    const handleUpdateItemQuantity = async ({ itemId, colour, size, quantity }: removeItemProps) => {
        if (session?.user?.id == null) {
            updateLocalStorageItemQuantity(itemId, colour.name, size.name, quantity);
        } else
            await updateItemQuantity.mutateAsync({
                userId: session.user.id,
                colourId: colour.id!,
                sizeId: size.id!,
                itemId,
                quantity,
            });
        refetch();
    };

    const handleRemoveItem = async ({ itemId, colour, size, quantity }: removeItemProps) => {
        if (session?.user?.id == null) {
            removeLocalStorageItem(itemId, colour.name, size.name);
            return showToast('Item removed from basket');
        }
        await removeItem.mutateAsync({
            userId: session.user.id,
            colourId: colour.id!,
            sizeId: size.id!,
            itemId,
            quantity,
        });
        refetch();
    };

    const makePayment = api.payment.makePayment.useMutation();

    const handlePayment = () => {
        if (basketItems.length === 0) return showToast('Basket is empty!');
        makePayment.mutateAsync(basketItems).then(data => push(data as string));
    };

    return (
        <>
            <NavigationHistory routes={['Basket']} />
            <div className='flex flex-col gap-5 lg:flex-row md:gap-8 lg:gap-16'>
                <div className='relative mb-6 flex flex-col gap-3 md:w-full'>
                    {removeItem.isLoading && (
                        <div className='absolute inset-0 z-40 flex items-center justify-center gap-3 bg-slate-300/40 text-slate-400'>
                            <Loader2 size={18} className='animate-spin' />
                            Loading
                        </div>
                    )}
                    <div className='w-full grid grid-cols-[min-content_auto_min-content_min-content_min-content] items-center gap-x-2 gap-y-4 text-left sm:gap-5 xl:gap-x-8 xl:gap-y-6'>
                        <div className='relative'>
                            <h1 className='absolute text-xl font-semibold text-slate-600 whitespace-nowrap'>Your items</h1>
                            <h1 className='opacity-0 text-xl font-semibold'>Your</h1>
                        </div>
                        <div />
                        <p className='font-semibold text-center my-2'>Price</p>
                        <p className='font-semibold text-center my-2'>Total</p>
                        <div />
                        {(!items || items.length === 0) && (!basketItems || basketItems.length === 0) ? (
                            <p className='py-8 text-center text-sm text-slate-400 col-span-5'>There are no items in your basket</p>
                        ) : (
                            basketItems?.map((basketItem: any, i: any) => (
                                <BasketItem {...basketItem} removeItem={handleRemoveItem} updateQuantity={handleUpdateItemQuantity} key={i} loading={removeItem.isLoading} />
                            ))
                        )}
                    </div>
                </div>

                <div className='md:w-[750px]'>
                    <h1 className='mb-4 text-xl font-semibold text-slate-600'>Summary</h1>
                    <div className='grid grid-cols-2 gap-3 text-slate-700'>
                        <p className='text-sm font-medium sm:text-base'>Subtotal</p>
                        <p className='justify-self-end text-sm sm:text-base'>
                            {currencyFormatter(basketItems?.reduce((prev: any, curr: any) => prev + (curr.item.oldPrice ? curr.item.oldPrice : curr.item.price) * curr.quantity, 0) ?? 0)}
                        </p>
                        <p className='text-sm font-medium sm:text-base'>Discounts</p>
                        <p className='justify-self-end text-sm sm:text-base text-orange-600'>
                            -{currencyFormatter(basketItems?.reduce((prev: any, curr: any) => prev + (curr.item.oldPrice ? (curr.item.oldPrice - curr.item.price) * curr.quantity : 0), 0) ?? 0)}
                        </p>
                        <div className='col-span-2 my-3 h-px bg-gray-200'></div>
                        <p className='text-sm font-medium sm:text-base'>Total</p>
                        <p className='justify-self-end text-sm font-semibold sm:text-base'>
                            {currencyFormatter(basketItems?.reduce((prev: any, curr: any) => prev + curr.item.price * curr.quantity, 0) ?? 0)}
                        </p>
                        <div className='col-span-2 my-3 h-px bg-gray-200'></div>
                        <div className='col-span-2'>
                            <CustomButton onClick={handlePayment} disabled={makePayment.isLoading}>
                                Continue with payment
                            </CustomButton>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='text-xs md:text-sm text-slate-500 flex mx-auto w-fit items-center gap-3'>
                            <Lock size={20} className='text-slate-500 font-medium self-start mt-1' /> You will not be charged until you review this order on the next page
                        </div>
                        <div className='mt-6'>
                            <p className='text-sm lg:text-base text-slate-600 font-medium flex items-center gap-2'>
                                <Cookie size={20} />
                                Ensuring your privacy
                            </p>
                            <p className='text-xs lg:text-sm text-black/80 sfont-light mt-2'>
                                Your privacy is our top priority. We treat your information with utmost security, adhere to our privacy and cookie policy, and use it exclusively to enhance our
                                services for your benefit.
                            </p>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm lg:text-base text-slate-600 font-medium flex items-center gap-2'>
                                <BadgeCheck size={20} />
                                Assurance Program
                            </p>
                            <p className='text-xs lg:text-sm text-black/80 sfont-light mt-2'>
                                Shop confidently at AjGarmz, where we&apos;ve got your back if anything goes amiss. Our AjGarmz Purchase Protection offers peace of mind with terms designed to support
                                you.
                            </p>
                        </div>
                        <div className='mt-4 mb-16'>
                            <p className='text-sm lg:text-base text-slate-600 font-medium flex items-center gap-2'>
                                <Truck size={20} />
                                Delivery Peace of Mind
                            </p>
                            <p className='text-xs lg:text-sm text-black/80 sfont-light mt-2'>Experience worry-free shopping with AjGarmz&apos;s commitment to timely and secure deliveries.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
