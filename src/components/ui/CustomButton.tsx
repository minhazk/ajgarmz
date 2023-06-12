import { Accessibility, Loader, Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

type ButtonProps = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    children: ReactNode;
};

export default function CustomButton({ children, type, disabled, ...buttonProps }: ButtonProps) {
    return (
        <button
            {...buttonProps}
            type={type ?? 'button'}
            disabled={disabled}
            className={`flex w-full items-center justify-center gap-3 rounded-md border border-slate-600 bg-slate-600 px-5 py-2 text-sm text-white transition-opacity hover:opacity-75 ${
                disabled ? 'opacity-60' : 'opacity-100'
            } transition-all`}
        >
            {disabled && <Loader2 size={17} className='animate-spin' />}
            {children}
        </button>
    );
}
