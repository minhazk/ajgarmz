import { User2, ShoppingCart, Search } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className='flex items-center justify-between px-1 py-3'>
            <Link href='/' className='text-xl font-semibold'>
                AjGarmz
            </Link>
            <ul className='flex items-center gap-4 text-sm font-semibold'>
                <li>Shop</li>
                <li>New Arrival</li>
                <li>Most Wanted</li>
                <li>Brands</li>
            </ul>
            <div className='flex items-center gap-4'>
                <div className='flex rounded border border-gray-300 bg-gray-100'>
                    <div className='flex items-center p-2 text-gray-500'>
                        <Search size={18} />
                    </div>
                    <input type='text' placeholder='Search' className='w-full bg-transparent text-sm outline-none' />
                </div>
                <div className='cursor-pointer opacity-50'>
                    <ShoppingCart size={20} />
                </div>
                <div className='cursor-pointer opacity-50'>
                    <User2 size={20} />
                </div>
            </div>
        </nav>
    );
}
