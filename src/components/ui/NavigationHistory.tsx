import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type NavigationHistoryProps = {
    routes: Array<string | null>;
};

export default function NavigationHistory({ routes }: NavigationHistoryProps) {
    return (
        <div className='mb-4 mt-5 flex flex-wrap items-center gap-2 text-sm'>
            <Link href='/' className='text-slate-500'>
                Home
            </Link>
            {routes
                .filter(r => r != null)
                .map((route, i) => (
                    <div className='flex flex-wrap items-center gap-2 text-sm' key={i}>
                        <ChevronRight className='text-gray-400 opacity-70' strokeWidth={2} size={18} />
                        <p className='whitespace-nowrap capitalize text-slate-500 last:font-semibold'>{route}</p>
                    </div>
                ))}
        </div>
    );
}
