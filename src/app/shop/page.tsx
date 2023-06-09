'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import FilterMenu, { appliedFiltersProps } from '@/components/shop/FilterMenu';
import ItemCard from '@/components/shop/ItemCard';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { useEffect, useState } from 'react';
import { api } from '@/util/trpc';

type PageProps = {
    searchParams: {
        category?: string;
    };
};

export default function Page({ searchParams: { category } }: PageProps) {
    const [appliedFilters, setAppliedFilters] = useState<appliedFiltersProps>({});
    const { data: categories } = api.items.getCategories.useQuery();
    const {
        data: pages,
        hasNextPage,
        fetchNextPage,
        isLoading,
        refetch,
    } = api.items.getAll.useInfiniteQuery(
        { filters: appliedFilters, searchParam: category?.toLowerCase(), limit: 10 },
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
        }
    );

    useEffect(() => {
        refetch();
    }, [appliedFilters, refetch]);

    console.log(appliedFilters, (pages?.pages[0].items.length ?? 0) + (pages?.pages[0].nextCursor ?? 0));

    type T = keyof typeof appliedFilters;

    const handleRemoveFilter = (filter: string) => {
        setAppliedFilters((filters: appliedFiltersProps) => {
            const updatedFilters: appliedFiltersProps = {};
            for (const [key, value] of Object.entries(filters)) {
                updatedFilters[key as T] = value?.filter(item => item !== filter) || [];
            }
            return updatedFilters;
        });
    };

    return (
        <>
            <NavigationHistory routes={['Browse Products', category ?? null]} />
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
                                Showing <span className='font-semibold'>{(pages?.pages[0].items.length ?? 0) + (pages?.pages[0].nextCursor ?? 0)}</span> results
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
                        {appliedFilters && Object.values(appliedFilters).length != 0 && <p className='text-sm font-semibold text-slate-600'>Applied Filters:</p>}
                        {appliedFilters &&
                            Object.values(appliedFilters)
                                .flat()
                                .map((filter: any, i) => (
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
                        {pages?.pages.map((page: any) => page.items.map((item: any) => <ItemCard key={item.id} {...item} />))}
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
