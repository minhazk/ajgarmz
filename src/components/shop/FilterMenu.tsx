'use client';

import { ChevronRight } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

type FilterMenuProps = {
    categories:
        | {
              id: number;
              name: string;
          }[]
        | undefined;
    setAppliedFilters: Dispatch<SetStateAction<appliedFiltersProps>>;
};

export type appliedFiltersProps = {
    Category?: string[];
    Department?: string[];
    Gender?: string[];
};

type FilterProps = {
    label: string;
    options: string[] | FilterProps;
}[];

export default function FilterMenu({ categories, setAppliedFilters }: FilterMenuProps) {
    const [filters, setFilters] = useState<FilterProps>([
        {
            label: 'Gender',
            options: ['Men', 'Women', 'Unisex'],
        },
        {
            label: 'Department',
            options: ['Clothing', 'Footwear', 'Accessories'],
        },
    ]);

    useEffect(() => {
        if (!categories) return;
        setFilters(filters => {
            return [
                ...filters,
                {
                    label: 'Category',
                    options: categories.map(category => category.name),
                },
            ];
        });
    }, [categories]);

    return (
        <div className='hidden w-64 divide-y-2 divide-gray-50 rounded-md border border-gray-200 p-3 sm:block'>
            {filters.map((filter, i) => (
                <FilterButton key={i} {...filter} setAppliedFilters={setAppliedFilters} />
            ))}
        </div>
    );
}

type FilterButtonProps = {
    key: number;
    label: string;
    options: string[] | FilterProps;
    setAppliedFilters: Dispatch<SetStateAction<appliedFiltersProps>>;
};

function FilterButton({ label, options, setAppliedFilters }: FilterButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnInput = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const isChecked = input.checked;
        console.log(e.target as HTMLInputElement);
        setAppliedFilters((prev: appliedFiltersProps) => {
            const arr = (prev[label] ||= []);
            arr.push(input.id);
            return { ...prev };
        });
    };

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
                                <input id={option} type='checkbox' onChange={handleOnInput} />
                                <label htmlFor={option} className='text-xs font-medium text-gray-500 first-letter:uppercase'>
                                    {option}
                                </label>
                            </div>
                        ) : (
                            <FilterButton key={i} {...option} setAppliedFilters={setAppliedFilters} />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
