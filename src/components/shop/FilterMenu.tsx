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
    label: FilterLabels;
    options: string[] | FilterProps;
}[];

export type FilterLabels = 'Category' | 'Department' | 'Gender';

export default function FilterMenu({ categories, setAppliedFilters }: FilterMenuProps) {
    const [filters, setFilters] = useState<FilterProps>([
        {
            label: 'Gender',
            options: ['Men', 'Women'],
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
        <div className='divide-y-2 divide-gray-50 rounded-md border border-gray-200 p-3'>
            {filters.map((filter, i) => (
                <FilterButton key={i} {...filter} setAppliedFilters={setAppliedFilters} />
            ))}
        </div>
    );
}

type FilterButtonProps = {
    key: number;
    label: FilterLabels;
    options: string[] | FilterProps;
    setAppliedFilters: Dispatch<SetStateAction<appliedFiltersProps>>;
};

function FilterButton({ label, options, setAppliedFilters }: FilterButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOnInput = (e: ChangeEvent) => {
        const input = e.target as HTMLInputElement;
        const isChecked = input.checked;
        const filter = input.id.toLowerCase();
        setAppliedFilters((filters: appliedFiltersProps) => {
            for (const [key, value] of Object.entries(filters)) {
                if (value.includes(filter)) {
                    filters[key as keyof typeof filters] = filters[key as keyof typeof filters]?.filter(items => items !== filter);
                    return { ...filters };
                }
            }
            const arr = (filters[label] ||= []);
            arr.push(filter);
            return { ...filters };
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
