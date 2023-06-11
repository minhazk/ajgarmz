import { ReactNode } from 'react';

type ButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    children: ReactNode;
};

export default function CustomButton({ children, ...buttonProps }: ButtonProps) {
    return (
        <button {...buttonProps} className='w-full rounded-md border border-slate-600 bg-slate-600 px-5 py-2 text-sm text-white transition-opacity hover:opacity-75'>
            {children}
        </button>
    );
}
