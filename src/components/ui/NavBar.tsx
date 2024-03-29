'use client';

import { showToast } from '@/util/toastNotification';
import { User2, ShoppingCart, Menu, PackagePlus, X } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import { useUserContext } from '@/util/UserContext';

export default function NavBar() {
    const [burgerOpen, setBurgerOpen] = useState<boolean>(false);
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const {basketCount, session } = useUserContext()

    useEffect(() => {
        const resize = () => {
            if (window.innerWidth > 768) setBurgerOpen(false);
        };
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    const handleCloseMenus = () => {
        setBurgerOpen(false);
        setUserMenuOpen(false);
    };

    return (
        <nav className='relative flex items-center justify-between py-3'>
            <div className='flex items-center gap-1 lg:gap-28'>
                <button onClick={() => setBurgerOpen(p => !p)} className='-ml-1 rounded-full p-2 text-slate-800 transition-colors hover:bg-gray-100 lg:hidden'>
                    {burgerOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <Link href='/' className='text-xl font-semibold text-slate-600 lg:text-2xl'>
                    AjGarmz
                </Link>
                <div className={`lg:block ${burgerOpen ? 'absolute left-0 top-full z-40 mt-2 block w-52 overflow-hidden rounded-lg border border-gray-300 bg-white lg:hidden' : 'hidden'}`}>
                    <ul className='flex flex-col text-sm font-semibold text-slate-500 lg:flex-row lg:items-center lg:gap-3 lg:text-base'>
                        <li>
                            <Link
                                onClick={handleCloseMenus}
                                href='/shop'
                                className='before-0 relative block w-full py-4 pl-8 pr-2 transition-colors before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-0 before:-translate-x-1/2 before:bg-slate-600 before:transition-all md:hover:before:w-full lg:px-1 lg:py-2'
                            >
                                Shop
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleCloseMenus}
                                href='/shop?category=men'
                                className='before-0 relative block w-full py-4 pl-8 pr-2 transition-colors before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-0 before:-translate-x-1/2 before:bg-slate-600 before:transition-all md:hover:before:w-full lg:px-1 lg:py-2'
                            >
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={handleCloseMenus}
                                href='/shop?category=women'
                                className='before-0 relative block w-full py-4 pl-8 pr-2 transition-colors before:absolute before:bottom-1 before:left-1/2 before:h-px before:w-0 before:-translate-x-1/2 before:bg-slate-600 before:transition-all md:hover:before:w-full lg:px-1 lg:py-2'
                            >
                                Women
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='ml-4 flex items-center text-slate-700'>
                <SearchForm closeMenus={handleCloseMenus} />
                {session?.user.type === 'admin' && (
                    <Link href='/admin' className='rounded-full p-2 transition-colors hover:bg-gray-100' onClick={handleCloseMenus}>
                        <PackagePlus size={20} strokeWidth={2} />
                    </Link>
                )}
                <Link href='/basket' className='rounded-full p-2 transition-colors hover:bg-gray-100 relative' onClick={handleCloseMenus}>
                    {basketCount === undefined || basketCount !== 0 &&
                    <div className='absolute -top-px -right-px min-w-[16px] py-px px-1 p-[.5px] flex justify-center items-center rounded-full bg-orange-500 text-[0.6rem] font-medium text-white'>{basketCount > 99 ? '99+' : basketCount}</div>
                    }
                    <ShoppingCart size={20} strokeWidth={2} />
                </Link>
                <div className='relative'>
                    <button onClick={() => setUserMenuOpen(p => !p)} className='flex items-center rounded-full p-2 transition-colors hover:bg-gray-100'>
                        <User2 size={20} strokeWidth={2} />
                    </button>
                    {userMenuOpen && (
                        <div className='absolute right-0 top-full z-40 mt-2 overflow-hidden rounded-md border border-slate-300 bg-white text-sm font-medium shadow-sm'>
                            {session?.user ? (
                                <button
                                    onClick={() => signOut().then(() => showToast('Account signed out'))}
                                    className='w-full whitespace-nowrap px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50'
                                >
                                    Sign out
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            handleCloseMenus();
                                            signIn();
                                        }}
                                        className='w-full whitespace-nowrap px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50'
                                    >
                                        Sign in
                                    </button>
                                    <Link href='/register' className='block w-full whitespace-nowrap px-6 py-2 text-slate-500 transition-colors hover:bg-gray-50' onClick={handleCloseMenus}>
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
