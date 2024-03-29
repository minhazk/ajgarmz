'use client';

import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormat from '@/util/currencyFormat';
import { showToast } from '@/util/toastNotification';
import { api } from '@/util/trpc';
import { Check, Search, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

type searchItem =
    | {
          id: number;
          name: string;
          description: string;
          gender: string;
          price: number;
          oldPrice: number | null;
          type: string;
      }[]
    | undefined;

export default function Page() {
    const [input, setInput] = useState('');
    const { data: items, refetch }: { data: searchItem; refetch: () => any } = api.admin.searchItems.useQuery(input, {
        refetchOnWindowFocus: false,
        enabled: false,
    });
    const updateItem = api.admin.updateItem.useMutation({
        onSuccess() {
            showToast('Item updated');
        },
        onError() {
            showToast('There was an error updating your item');
        },
    });

    const deleteItem = api.admin.deleteItem.useMutation({
        onSuccess() {
            showToast('Item removed');
        },
        onError() {
            showToast('There was an error removing this item');
        },
    });

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const searchInput = formData.get('search-input')!.toString();
        if (searchInput == '') return showToast('Input is empty');
        setInput(searchInput);
    };

    useEffect(() => {
        refetch();
    }, [input, refetch]);

    const handleUpdateItem = async (e: FormEvent, itemId: number) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const price = formData.get('price')!.toString();
        const oldPrice = formData.get('old-price')!.toString();
        const priceFormat = Number(price.replace(/(£|,)/g, ''));
        let oldPriceFormat = Number(oldPrice.replace(/(£|,)/g, '')) as number | null;
        if (priceFormat == null) return showToast('Item must have a price');
        if (oldPriceFormat == null || oldPriceFormat === 0) oldPriceFormat = null;
        if (isNaN(priceFormat) || (oldPriceFormat != null && isNaN(oldPriceFormat))) return showToast('Incorrectly formatted input. Valid input example: £1.00 or 1.00 or 1');
        await updateItem.mutateAsync({ id: itemId, price: priceFormat, oldPrice: oldPriceFormat });
        refetch();
    };

    const handleDeleteItem = async (id: number) => {
        await deleteItem.mutateAsync(id);
        refetch();
    };

    return (
        <div>
            <NavigationHistory routes={['admin', 'edit']} />

            <h1 className='mb-4 mt-2 text-lg font-medium text-slate-600'>Search items to edit</h1>
            <form onSubmit={handleSearch} className='mr-2 flex rounded border border-gray-200 bg-gray-50'>
                <button type='submit' className='flex items-center p-2 text-gray-500'>
                    <Search size={18} />
                </button>
                <input spellCheck={false} type='text' placeholder='Search' className='w-full bg-transparent text-sm font-medium text-slate-600 outline-none' name='search-input' />
            </form>

            <div className='my-5 flex flex-col gap-3'>
                {items != undefined && items.length !== 0 ? (
                    <>
                        <div className='grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-2 text-slate-600'>
                            <p className='min-w-[50px] text-xs font-semibold sm:text-sm'>ID</p>
                            <p className='text-xs font-semibold sm:text-sm'>Item Name</p>
                            <p className='text-xs font-semibold sm:text-sm'>Sale Price</p>
                            <p className='text-xs font-semibold sm:text-sm'>Old Price</p>
                            <button className='bg-transparent p-1 text-xs text-transparent'>
                                <Check size={18} />
                            </button>
                        </div>
                        {items.map(item => (
                            <form
                                onSubmit={e => handleUpdateItem(e, item.id)}
                                className='grid grid-cols-[auto_1fr_1fr_1fr_auto] items-center gap-4 rounded-md border border-gray-200 px-5 py-5 text-slate-600'
                                key={item.id}
                            >
                                <p className='min-w-[50px] text-xs font-semibold sm:text-sm'>{item.id}</p>
                                <p className='text-xs font-semibold sm:text-sm'>{item.name}</p>
                                <input
                                    name='price'
                                    className='w-full rounded-md border border-slate-200 p-1 text-xs outline-none transition-colors focus-within:border-slate-300 sm:text-sm'
                                    defaultValue={currencyFormat(item?.oldPrice ? item.price : 0)}
                                />
                                <input
                                    name='old-price'
                                    className='w-full rounded-md border border-slate-200 p-1 text-xs outline-none transition-colors focus-within:border-slate-300 sm:text-sm'
                                    defaultValue={currencyFormat(item?.oldPrice ? item.oldPrice : item.price)}
                                />
                                <div className='flex items-center justify-center gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => handleDeleteItem(item.id)}
                                        className='rounded-full bg-transparent p-1 text-xs text-slate-600 transition-colors hover:bg-red-500 hover:text-white'
                                    >
                                        <X size={18} />
                                    </button>
                                    <button
                                        disabled={updateItem.isLoading}
                                        type='submit'
                                        className='rounded-full bg-transparent p-1 text-xs text-slate-600 transition-colors hover:bg-slate-500 hover:text-white'
                                    >
                                        <Check size={18} />
                                    </button>
                                </div>
                            </form>
                        ))}
                    </>
                ) : (
                    <p className='my-12 text-center text-sm text-slate-500'>No items found</p>
                )}
            </div>
        </div>
    );
}
