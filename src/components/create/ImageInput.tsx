import { useState } from 'react';

type ImageInputProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImageInput({ onChange }: ImageInputProps) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className={`relative flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 ${isHovering && 'opacity-60'}`}>
            <p className='text-xs text-slate-500 lg:text-sm'>Drag & Drop your images or click to browse files</p>
            <input
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onDragEnter={() => setIsHovering(true)}
                onDragLeave={() => setIsHovering(false)}
                onDrop={() => setIsHovering(false)}
                onChange={onChange}
                type='file'
                className='absolute inset-0 cursor-pointer opacity-0'
                multiple
            />
        </div>
    );
}
