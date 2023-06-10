'use client';

import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';
import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import CustomButton from '@/components/ui/CustomButton';
import BasketItem, { removeItemProps } from '@/components/basket/BasketItem';
import { showToast } from '@/util/toastNotification';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { data: session } = useSession();
    const { data: items, refetch } = api.items.getUserItems.useQuery(session?.user?.id ?? null);
    const { push } = useRouter();

    const removeItem = api.items.removeItemFromBasket.useMutation({
        onSuccess() {
            showToast('Item removed from basket');
        },
        onError() {
            showToast('There was an error removing your item.');
        },
    });

    const makePayment = api.payment.makePayment.useMutation({
        onSuccess() {
            showToast('Your order has been placed');
        },
        onError() {
            showToast('There was an error placing your order');
        },
    });

    const handleRemoveItem = async ({ colourId, sizeId, itemId, quantity }: removeItemProps) => {
        if (session?.user?.id == null) return;
        await removeItem.mutateAsync({
            userId: session.user.id,
            colourId,
            sizeId,
            itemId,
            quantity,
        });
        refetch();
    };

    const handlePayment = () => {
        makePayment.mutateAsync(items).then(data => push(data as string));
    };

    return (
        <>
            <NavigationHistory routes={['Basket']} />
            <div className='flex flex-col gap-5 md:flex-row md:gap-16'>
                <div className='relative mb-6 flex flex-col gap-3 md:w-[60%]'>
                    {removeItem.isLoading && (
                        <div className='absolute inset-0 z-40 flex items-center justify-center gap-3 bg-slate-300/40 text-slate-400'>
                            <Loader2 size={18} className='animate-spin' />
                            Loading
                        </div>
                    )}
                    <h1 className='mb-3 text-xl font-semibold text-slate-600'>Your items</h1>
                    {!items || items.length === 0 ? (
                        <p className='py-8 text-center text-sm text-slate-400'>There are no items in your basket</p>
                    ) : (
                        items?.map((basketItem: any, i: any) => <BasketItem {...basketItem} removeItem={handleRemoveItem} key={i} loading={removeItem.isLoading} />)
                    )}
                </div>

                <div className='md:w-[40%]'>
                    <h1 className='mb-4 text-xl font-semibold text-slate-600'>Summary</h1>
                    <div className='grid grid-cols-2 gap-3 text-slate-700'>
                        <p className='text-sm font-medium sm:text-base'>Subtotal</p>
                        <p className='justify-self-end text-sm sm:text-base'>{currencyFormatter(items?.reduce((prev: any, curr: any) => prev + curr.item.price * curr.quantity, 0) ?? 0)}</p>
                        <p className='text-sm font-medium sm:text-base'>Total</p>
                        <p className='justify-self-end text-sm font-semibold sm:text-base'>
                            {currencyFormatter(items?.reduce((prev: any, curr: any) => prev + curr.item.price * curr.quantity, 0) ?? 0)}
                        </p>
                        <div className='col-span-2 my-3 h-px bg-gray-200'></div>
                        <div className='col-span-2'>
                            <CustomButton onClick={handlePayment}>Stripe</CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
