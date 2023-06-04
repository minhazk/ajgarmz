'use client';

import { X } from 'lucide-react';
import FilterMenu from '@/components/shop/FilterMenu';
import ItemCard from '@/components/shop/ItemCard';
import dummy_tee from '../../assets/dummy_tee.jpg';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { api } from '@/util/trpc';

export default function Page() {
    const hello = api.example.hello.useQuery({ text: 'from tRPC' });
    const { data } = api.items.getAll.useQuery();
    console.log(data);

    const appliedFilters = ['Men', 'Tops'];
    const items = [
        {
            id: 8561,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 651,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 5321,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 2311,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1523,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 142,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1321,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
    ];

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
                        {items.map(item => (
                            <ItemCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
