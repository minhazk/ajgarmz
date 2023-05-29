import Link from 'next/link';
import { ChevronRight, X } from 'lucide-react';
import FilterMenu from '@/components/shop/FilterMenu';
import ItemCard from '@/components/shop/ItemCard';
import dummy_tee from '../../assets/dummy_tee.jpg';

export default function page() {
    const appliedFilters = ['Men', 'Tops'];
    const items = [
        {
            id: 1,
            name: 'Christian Dior T-Shirt Dior T-Shirt Dior T-Shirt Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
        {
            id: 1,
            name: 'Christian Dior T-Shirt',
            mainImage: dummy_tee,
            price: 85,
            oldPrice: 95,
            colours: ['Red', 'Black'],
        },
    ];

    return (
        <>
            <div className='mb-4 mt-5 flex items-center gap-3 text-sm'>
                <Link href='/' className='text-gray-500 opacity-70'>
                    Home
                </Link>
                <ChevronRight className='text-gray-400 opacity-70' strokeWidth={2} size={18} />
                <p className='font-semibold text-slate-500'>Browse products</p>
            </div>

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
