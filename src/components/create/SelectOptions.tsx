'use client';

import { useEffect, useState } from 'react';
import Select, { GroupBase } from 'react-select';
import Creatable from 'react-select/creatable';

type MultiSelectProps = {
    options: readonly ({ value: string; label: string } | GroupBase<{ value: string; label: string }>)[];
    label: string;
    setter: (options: any) => void;
    isMulti?: boolean;
    insertAll?: boolean;
};

export function MultiSelect({ options, setter, label, isMulti }: MultiSelectProps) {
    return (
        <div className='my-4 flex flex-col gap-2'>
            <label className='text-sm font-medium'>{label}</label>
            <Select options={options} isMulti={isMulti} closeMenuOnSelect={!isMulti} onChange={(selected: any) => (isMulti ? setter(selected?.map((s: any) => s.value)) : setter(selected.value))} />
        </div>
    );
}

export function MultiSelectCreatable({ options, setter, label, isMulti, insertAll }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<{ label: string; value: string }[] | { label: string; value: string }>();

    useEffect(() => {
        setter(selectedOptions);
    }, [selectedOptions, setter]);

    console.log(options);

    return (
        <div className='my-4 flex flex-col gap-2'>
            <div className='flex flex-row gap-3'>
                <label className='text-sm font-medium'>{label}</label>
                {insertAll && (
                    <button onClick={() => setSelectedOptions(options as any)} type='button' className='text-xs text-gray-400 transition-all hover:underline'>
                        insert all
                    </button>
                )}
            </div>
            <Creatable
                isMulti={isMulti}
                options={options}
                closeMenuOnSelect={!isMulti}
                onChange={(selected: any) => (isMulti ? setSelectedOptions(selected) : setSelectedOptions(selected.value))}
                value={Array.isArray(selectedOptions) ? selectedOptions : selectedOptions?.value}
            />
        </div>
    );
}
