'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import FilterMenu, { appliedFiltersProps } from '@/components/shop/FilterMenu';
import ItemCard from '@/components/shop/ItemCard';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { api } from '@/util/trpc';
import { useState } from 'react';

export default function Page() {
    const [appliedFilters, setAppliedFilters] = useState<appliedFiltersProps>({});
    const {
        data: pages,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = api.items.getAll.useInfiniteQuery(
        { filters: appliedFilters, limit: 3 },
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
        }
    );
    const { data: categories } = api.items.getCategories.useQuery();

    type T = keyof typeof appliedFilters;

    const handleRemoveFilter = (filter: string) => {
        setAppliedFilters((filters: appliedFiltersProps) => {
            for (const [key, value] of Object.entries(filters)) {
                if (value.includes(filter)) {
                    filters[key as T] = filters[key as T]?.filter(items => items !== filter);
                    break;
                }
            }
            return { ...filters };
        });
    };

    console.log(pages);

    return (
        <>
            <NavigationHistory routes={['Browse Products']} />

            <div className='flex items-start gap-4'>
                <div className='hidden w-64 sm:block'>
                    <FilterMenu categories={categories} setAppliedFilters={setAppliedFilters} />
                </div>

                <div className='w-full'>
                    <div className='flex items-center justify-between gap-2 text-xs text-slate-600'>
                        <div className='relative flex items-center gap-3'>
                            <label htmlFor='filter' className='cursor-pointer sm:hidden'>
                                <SlidersHorizontal size={17} />
                            </label>
                            <input id='filter' type='checkbox' className='peer hidden text-slate-500' />
                            <div className='absolute left-0 top-full z-40 my-3 hidden w-52 bg-white peer-checked:block'>
                                <FilterMenu categories={categories} setAppliedFilters={setAppliedFilters} />
                            </div>

                            <p>
                                Showing <span className='font-semibold'>{(pages?.pages[0].items.length ?? 1) * (pages?.pages.length ?? 1)}</span> results
                            </p>
                        </div>
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
                        {Object.values(appliedFilters)
                            .flat()
                            .map((filter, i) => (
                                <button
                                    onClick={() => handleRemoveFilter(filter)}
                                    key={i}
                                    className='flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1 text-sm transition-colors hover:bg-gray-50'
                                >
                                    {filter}
                                    <X size={15} className='text-gray-500' />
                                </button>
                            ))}
                    </div>

                    <div className='grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {pages?.pages.map(page => page.items.map(item => <ItemCard key={item.id} {...item} />))}
                    </div>

                    {hasNextPage && (
                        <div className='my-5 flex justify-center'>
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isLoading}
                                className='rounded-md border border-gray-200 px-4 py-2 text-xs text-slate-400 transition-colors hover:bg-gray-50 sm:text-sm'
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
