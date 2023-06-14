import { Loader2, Search } from 'lucide-react';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { api } from '@/util/trpc';
import Link from 'next/link';
import currencyFormat from '@/util/currencyFormat';

type SearchDataProps = {
    data:
        | {
              id: number;
              name: string;
              price: number;
              oldPrice: number | null;
          }[]
        | undefined;
    refetch: () => any;
    isLoading: boolean;
};

export default function SearchForm() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState<string | null>(null);
    const {
        data: items,
        refetch,
        isLoading,
    }: SearchDataProps = api.items.searchItems.useQuery(input, {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: input !== null || input !== '',
        refetchOnMount: false,
    });

    useEffect(() => {
        const resize = () => setOpen(false);
        window.addEventListener('resize', resize);
        return () => {
            return window.removeEventListener('resize', resize);
        };
    }, []);

    const handleSearch = () => {
        refetch();
    };

    const debounceFn = useMemo(() => debounce(handleSearch, 1000), []);

    const handleChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setInput(value);
        debounceFn();
    };

    console.log(items);

    return (
        <>
            <button className='rounded-full p-2 transition-colors hover:bg-gray-100 sm:hidden' onClick={() => setOpen(open => !open)}>
                <Search size={19} />
            </button>

            <div className={`${open ? 'absolute left-0 top-full z-50 flex w-full' : 'relative hidden'} mr-2 rounded border border-gray-200 bg-gray-50 sm:flex`}>
                <div className='flex items-center p-2 text-gray-500'>
                    <Search size={18} />
                </div>
                <input onChange={handleChange} type='text' placeholder='Search' className='w-full bg-transparent text-sm outline-none md:w-52 lg:w-64' />

                {items != null && items.length !== 0 && (
                    <div className='absolute top-full z-50 my-3 flex w-full flex-col overflow-hidden rounded-md border bg-white text-sm text-slate-500'>
                        {items.map(item => (
                            <Link
                                href={`item/${item.id}`}
                                className='hover:bg-gray-10 flex cursor-pointer items-center gap-3 px-3 py-3'
                                onClick={() => {
                                    setInput(null);
                                    setOpen(false);
                                }}
                                key={item.id}
                            >
                                <p className='overflow-hidden text-ellipsis font-medium first-letter:uppercase' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                    {item.name}
                                </p>
                                <div className='ml-auto flex flex-col'>
                                    <p className='font-medium'>{currencyFormat(item.price)}</p>
                                    {item.oldPrice != null && <p className='text-xs text-slate-300 line-through'>{currencyFormat(item.oldPrice)}</p>}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {isLoading && (
                    <div className='absolute top-full z-50 my-3 flex w-full flex-col overflow-hidden rounded-md border bg-white text-sm text-gray-400'>
                        <p className='flex items-center justify-center gap-3 px-3 py-3 font-light'>
                            <Loader2 className='animate-spin' size={16} strokeWidth={1} />
                            Searching
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
