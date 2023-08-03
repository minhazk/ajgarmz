'use client';

import { useEffect, useState } from 'react';
import Select, { GroupBase, PropsValue } from 'react-select';
import Creatable from 'react-select/creatable';

type MultiSelectProps = {
    options: readonly ({ value: string; label: string } | GroupBase<{ value: string; label: string }>)[];
    label: string;
    setter: (options: any) => void;
    isMulti?: boolean;
    insertAll?: boolean;
};

export function MultiSelect({ options, setter, label, isMulti, insertAll }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<PropsValue<{ label: string; value: string }> | undefined>();

    useEffect(() => {
        setter(selectedOptions);
    }, [selectedOptions, setter]);

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
            <Select options={options} isMulti={isMulti} closeMenuOnSelect={!isMulti} onChange={(selected: any) => setSelectedOptions(selected)} value={selectedOptions} />
        </div>
    );
}

export function MultiSelectCreatable({ options, setter, label, isMulti, insertAll }: MultiSelectProps) {
    const [selectedOptions, setSelectedOptions] = useState<PropsValue<{ label: string; value: string }> | undefined>();

    useEffect(() => {
        setter(selectedOptions);
    }, [selectedOptions, setter]);

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
            <Creatable isMulti={isMulti} options={options} closeMenuOnSelect={!isMulti} onChange={(selected: any) => setSelectedOptions(selected)} value={selectedOptions} />
        </div>
    );
}
