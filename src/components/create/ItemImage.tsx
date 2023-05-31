import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export type ImageFileProps = {
    astModified: number;
    name: string;
    size: number;
    type: string;
    objectURL: string;
    lastModifiedDate: Date;
};

type ItemImageProps = {
    image: string;
    setImages: (images: any) => void;
    images: { mainImage: string; images: ImageFileProps[] };
};

export default function ItemImage({ image, setImages, images }: ItemImageProps) {
    const [hovering, setHovering] = useState(false);

    const handelRemoveImage = () =>
        setImages((prev: { mainImage: string; images: ImageFileProps[] }) => {
            console.log(1, prev.mainImage, 2, image);
            if (prev.mainImage === image) prev.mainImage = prev.images[0].objectURL;
            prev.images = prev.images.filter(item => item.objectURL !== image);
            return { ...prev };
        });

    const handleSelectMainImage = () =>
        setImages((prev: { mainImage: string; images: ImageFileProps[] }) => {
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
                <Image src={image} fill className='object-cover' alt={image} />
            </div>
            {images.mainImage === image && (
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-md border-2 border-white bg-slate-800 px-5 py-1 text-xs font-semibold text-white'>MAIN</div>
            )}
        </div>
    );
}
