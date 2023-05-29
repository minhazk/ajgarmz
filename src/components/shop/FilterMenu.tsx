'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const filters = [
    {
        label: 'Category',
        options: [
            {
                label: 'Women',
                options: ['Top', 'Jackets', 'Sweaters'],
            },
        ],
    },
    {
        label: 'Category',
        options: ['weewq', 'weewq', 'weewq', 'weewq'],
    },
    {
        label: 'Category',
        options: ['weewq', 'weewq', 'weewq'],
    },
];

export default function FilterMenu() {
    return (
        <div className='hidden w-64 divide-y-2 divide-gray-50 rounded-md border border-gray-200 p-3 sm:block'>
            {filters.map((filter, i) => (
                <FilterButton key={i} {...filter} />
            ))}
        </div>
    );
}

type FilterButtonProps = {
    label: string;
    options: Array<string | FilterButtonProps>;
};

function FilterButton({ label, options }: FilterButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(p => !p)}
                className='flex w-full items-center justify-between gap-2 rounded bg-white px-3 py-3 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50'
            >
                {label}
                <ChevronRight size={18} className={`${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && (
                <div className='mb-1 flex flex-col gap-1 px-4'>
                    {options.map((option, i) => {
                        return typeof option === 'string' ? (
                            <div key={i} className='flex cursor-pointer items-center gap-2 py-2'>
                                <input id={option} type='checkbox' />
                                <label htmlFor={option} className='text-xs font-medium text-gray-500'>
                                    {option}
                                </label>
                            </div>
                        ) : (
                            <FilterButton key={i} {...option} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
