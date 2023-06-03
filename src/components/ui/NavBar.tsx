'use client';

import { User2, ShoppingCart, Search, Menu, PackagePlus, X } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    console.log(session);

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth > 768) setBurgerOpen(false);
        };
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <nav className='relative flex items-center justify-between py-3'>
            <div className='flex items-center gap-3 lg:gap-28'>
                <button onClick={() => setBurgerOpen(p => !p)} className='text-slate-800 lg:hidden'>
                    {burgerOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <Link href='/' className='text-xl font-semibold text-slate-600'>
                    AjGarmz
                </Link>
                <div className={`lg:block ${burgerOpen ? 'absolute left-0 top-full z-40 mt-2 block w-52 overflow-hidden rounded-lg border border-gray-300 bg-white py-4 lg:hidden' : 'hidden'}`}>
                    <ul className='flex flex-col text-sm font-semibold text-slate-500 lg:flex-row lg:items-center lg:gap-3'>
                        <li>
                            <Link href='/shop' className='block w-full py-4 pl-8 pr-2 transition-colors lg:px-1 lg:py-2'>
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className='block w-full py-4 pl-8 pr-2 transition-colors lg:px-1 lg:py-2'>
                                New Arrival
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className='block w-full py-4 pl-8 pr-2 transition-colors lg:px-1 lg:py-2'>
                                Most Wanted
                            </Link>
                        </li>
                        <li>
                            <Link href='/' className='block w-full py-4 pl-8 pr-2 transition-colors lg:px-1 lg:py-2'>
                                Brands
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='ml-4 flex items-center'>
                <button className='rounded-full p-2 transition-colors hover:bg-gray-100 sm:hidden'>
                    <Search size={19} />
                </button>
                <div className='mr-2 hidden rounded border border-gray-200 bg-gray-50 sm:flex'>
                    <div className='flex items-center p-2 text-gray-500'>
                        <Search size={18} />
                    </div>
                    <input type='text' placeholder='Search' className='bg-transparent text-sm outline-none md:w-36 lg:w-full' />
                </div>
                <Link href='/create' className='rounded-full p-2 transition-colors hover:bg-gray-100'>
                    <PackagePlus size={20} strokeWidth={2} />
                </Link>
                <div className='cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100'>
                    <ShoppingCart size={20} strokeWidth={2} />
                </div>
                <div className='relative'>
                    <button onClick={() => setUserMenuOpen(p => !p)} className='flex items-center rounded-full p-2 transition-colors hover:bg-gray-100'>
                        <User2 size={20} strokeWidth={2} />
                    </button>
                    {userMenuOpen && (
                        <div className='absolute right-0 top-full z-40 mt-2 overflow-hidden rounded-md border border-slate-300 bg-white text-sm font-medium shadow-sm'>
                            {session?.user ? (
                                <button onClick={() => signOut()} className='w-full px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50'>
                                    Sign out
                                </button>
                            ) : (
                                <>
                                    <button onClick={() => signIn()} className='w-full px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50'>
                                        Sign in
                                    </button>
                                    <Link href='/register' className='block w-full px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50'>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}