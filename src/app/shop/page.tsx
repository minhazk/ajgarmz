'use client';

import { X } from 'lucide-react';
import FilterMenu from '@/components/shop/FilterMenu';
import ItemCard, { ItemCardProps } from '@/components/shop/ItemCard';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { api } from '@/util/trpc';

export default function Page() {
    const { data: items } = api.items.getAll.useQuery();
    console.log(items);
    const appliedFilters = ['Men', 'Tops'];

    return (
        <>
            <NavigationHistory routes={['Browse Products']} />

            <div className='flex items-start gap-4'>
                <FilterMenu />

                <div className='w-full'>
                    <div className='flex items-center justify-between gap-2 text-xs text-slate-600'>
                        <p>
                            Showing <span className='font-semibold'>{0}</span> results
                        </p>
                        <div className='flex items-center gap-2'>
                            <p>Sort by</p>
                            <select className='rounded-md border border-gray-200 p-2 outline-none'>
                                <option>Newest</option>
                                <option>£ Highest - Lowest</option>
                                <option>£ Lowest - Highest</option>
                            </select>
                        </div>
                    </div>

                    <div className='mb-3 mt-1 flex flex-wrap items-center gap-3'>
                        <p className='text-sm font-semibold text-slate-600'>Applied Filters:</p>
                        {appliedFilters.map((filter, i) => (
                            <button key={i} className='flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm transition-colors hover:bg-gray-50'>
                                {filter}
                                <X size={15} className='text-gray-500' />
                            </button>
                        ))}
                    </div>

                    <div className='grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {items?.map((item: ItemCardProps) => (
                            <ItemCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
