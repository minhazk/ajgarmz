import { User2, ShoppingCart, Search, Menu, PackagePlus } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className='flex items-center justify-between py-3'>
            <div className='flex items-center gap-3 md:gap-8 lg:gap-28'>
                <button className='md:hidden'>
                    <Menu size={20} />
                </button>
                <Link href='/' className='text-xl font-semibold text-slate-700'>
                    AjGarmz
                </Link>
                <ul className='hidden items-center gap-2 text-xs font-semibold text-slate-500 md:flex md:text-sm lg:gap-4'>
                    <li>
                        <Link href='/shop'>Shop</Link>
                    </li>
                    <li>New Arrival</li>
                    <li>Most Wanted</li>
                    <li>Brands</li>
                </ul>
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
