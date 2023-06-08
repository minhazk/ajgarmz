import React, { useState, useContext, createContext, ReactNode } from 'react';
import toast from 'react-simple-toasts';

type ToastContextType = {
    showToast: (text: string) => void;
};

const ToastContext = createContext<ToastContextType>({
    showToast: (text: string) => {},
});

export const useToast = (): ToastContextType => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
    const showToast = (text: string) => {
        void toast(<p className='text-sm font-medium text-slate-600'>{text}</p>, {
            duration: 3000,
            position: 'bottom-center',
            clickable: true,
            clickClosable: true,
            render: (message: ReactNode) => (
                <div className='rounded-md border border-slate-600 bg-white py-3' style={{ paddingInline: '30px' }}>
                    {message}
                </div>
            ),
        });
    };

    return <ToastContext.Provider value={{ showToast }}>{children}</ToastContext.Provider>;
}
