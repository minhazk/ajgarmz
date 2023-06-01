'use client';

import { User2, ShoppingCart, Search, Menu, PackagePlus, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
    const [burgerOpen, setBurgerOpen] = useState<boolean>(false);

    return (
        <nav className='relative flex items-center justify-between py-3'>
            <div className='flex items-center gap-3 md:gap-8 lg:gap-28'>
                <button onClick={() => setBurgerOpen(p => !p)} className='text-slate-7800 md:hidden'>
                    {burgerOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <Link href='/' className='text-xl font-semibold text-slate-600'>
                    AjGarmz
                </Link>
                {burgerOpen && (
                    <div className='absolute left-0 top-full z-40 w-52 rounded-r-md bg-white px-4 pb-44 pt-10 md:hidden'>
                        <NavMenuItems />
                    </div>
                )}
                <div className='hidden md:block'>
                    <NavMenuItems />
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <button className='sm:hidden'>
                    <Search size={19} />
                </button>
                <div className='hidden rounded border border-gray-200 bg-gray-50 sm:flex'>
                    <div className='flex items-center p-2 text-gray-500'>
                        <Search size={18} />
                    </div>
                    <input type='text' placeholder='Search' className='bg-transparent text-sm outline-none md:w-36 lg:w-full' />
                </div>
                <Link href='/create'>
                    <PackagePlus size={20} strokeWidth={2} />
                </Link>
                <div className='cursor-pointer'>
                    <ShoppingCart size={20} strokeWidth={2} />
                </div>
                <div className='cursor-pointer'>
                    <User2 size={20} strokeWidth={2} />
                </div>
            </div>
        </nav>
    );
}

type NavMenuItemsProps = {};

function NavMenuItems() {
    return (
        <ul className='flex flex-col gap-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:gap-2 md:text-sm lg:gap-4'>
            <li>
                <Link href='/shop'>Shop</Link>
            </li>
            <li>New Arrival</li>
            <li>Most Wanted</li>
            <li>Brands</li>
        </ul>
    );
}
