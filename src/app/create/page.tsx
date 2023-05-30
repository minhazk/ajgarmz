'use client';

import NavigationHistory from '@/components/NavigationHistory';
import Creatable, { useCreatable } from 'react-select/creatable';

export default function Page() {
    return (
        <div>
            <NavigationHistory routes={['Create Listing']} />

            <div>
                <h1 className='text-2xl font-semibold text-slate-600'>Create Listing</h1>

                <InputGroup label='Item title' />
                <InputGroup label='Item description' />

                <Creatable />
            </div>
        </div>
    );
}

type InputGroupProps = {
    label: string;
};

function InputGroup({ label }: InputGroupProps) {
    return (
        <div className='my-4 flex flex-col gap-2'>
            <label className='text-sm font-medium' htmlFor={label}>
                {label}
            </label>
            <input className='rounded-md border border-gray-200 p-2 text-sm outline-none' placeholder='Type here' id={label} />
        </div>
    );
}
