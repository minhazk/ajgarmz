type FormInputProps = {
    label: string;
    type?: string;
};

export default function FormInput({ label, type }: FormInputProps) {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={label.toLowerCase()} className='text-x font-medium text-slate-600'>
                {label}
            </label>
            <input
                id={label.toLowerCase()}
                name={label.toLowerCase()}
                type={type ?? 'text'}
                className='rounded-md border p-2 text-sm text-slate-500 outline-none transition-colors focus-within:border-slate-800'
                placeholder='Type here'
            />
        </div>
    );
}
