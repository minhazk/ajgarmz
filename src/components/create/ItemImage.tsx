import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export type ImageFileProps = {
    name: string;
    url: string;
};

type ItemImageProps = {
    image: ImageFileProps;
    setImages: (images: any) => void;
    images: ImagesStateProps;
};

export type ImagesStateProps = {
    mainImage: ImageFileProps | null;
    images: ImageFileProps[];
};

export default function ItemImage({ image, setImages, images }: ItemImageProps) {
    const [hovering, setHovering] = useState(false);

    const handelRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setImages((prev: ImagesStateProps) => {
            prev.images = prev.images.filter(item => item.name !== image.name);
            if (prev.mainImage?.name === image.name) {
                prev.mainImage = prev.images.length === 0 ? null : prev.images[0];
            }
            return { ...prev };
        });
    };

    const handleSelectMainImage = () =>
        setImages((prev: ImagesStateProps) => {
            prev.mainImage = image;
            return { ...prev };
        });

    return (
        <div onClick={handleSelectMainImage} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className='relative cursor-pointer rounded-md border border-gray-300 p-2'>
            {hovering && (
                <button onClick={handelRemoveImage} className='absolute right-0 top-0 z-10 w-fit -translate-y-1/2 translate-x-1/2 rounded-full bg-red-500 p-1 text-xs font-semibold text-white'>
                    <X size={14} strokeWidth={2} />
                </button>
            )}
            <div className='relative aspect-square w-24 overflow-hidden rounded-md lg:w-32'>
                <Image src={image.url} fill className='object-cover' alt={image.name} />
            </div>
            {images.mainImage?.name === image.name && (
                <div className='absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-md border-2 border-white bg-slate-800 px-5 py-1 text-xs font-semibold text-white'>MAIN</div>
            )}
        </div>
    );
}
