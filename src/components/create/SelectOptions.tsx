import Select, { GroupBase } from 'react-select';
import Creatable from 'react-select/creatable';

type MultiSelectProps = {
    options: readonly ({ value: string; label: string } | GroupBase<{ value: string; label: string }>)[];
    label: string;
    setter: (options: any) => void;
    isMulti?: boolean;
};

export function MultiSelect({ options, setter, label, isMulti }: MultiSelectProps) {
    return (
        <div className='my-4 flex flex-col gap-2'>
            <label className='text-sm font-medium'>{label}</label>
            <Select options={options} isMulti={isMulti} closeMenuOnSelect={!isMulti} onChange={(selected: any) => (isMulti ? setter(selected?.map((s: any) => s.value)) : setter(selected.value))} />
        </div>
    );
}

export function MultiSelectCreatable({ options, setter, label, isMulti }: MultiSelectProps) {
    return (
        <div className='my-4 flex flex-col gap-2'>
            <label className='text-sm font-medium'>{label}</label>
            <Creatable isMulti={isMulti} options={options} closeMenuOnSelect={!isMulti} onChange={(selected: any) => (isMulti ? setter(selected?.map((s: any) => s.value)) : setter(selected.value))} />
        </div>
    );
}
