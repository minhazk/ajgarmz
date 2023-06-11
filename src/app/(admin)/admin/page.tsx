import { AlignHorizontalJustifyEndIcon, BarChart2, Edit3, PackagePlus, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    return (
        <div className='mx-auto my-12 flex flex-wrap items-center justify-center gap-10 px-5'>
            <BubbleButton href='/create' icon={<PackagePlus size={33} />} label='Create Item' />
            <BubbleButton href='/orders' icon={<Truck size={33} />} label='Orders' />
            <BubbleButton href='/edit' icon={<Edit3 size={33} />} label='Edit Items' />
        </div>
    );
}

type BubbleButtonProps = {
    href: string;
    icon: any;
    label: string;
};

function BubbleButton({ href, icon, label }: BubbleButtonProps) {
    return (
        <Link href={href} className='cursor-pointer hover:opacity-60'>
            <div className='rounded-full border border-slate-200 bg-gray-100 p-9 text-slate-700'>{icon}</div>
            <p className='relative mt-3 text-center text-sm font-semibold text-slate-600'>{label}</p>
        </Link>
    );
}
