import Image, { StaticImageData } from 'next/image';
import accessories from '../../assets/accessories.jpg';
import footwear from '../../assets/footwear.jpg';
import clothing from '../../assets/clothing.jpg';
import casual from '../../assets/casual.jpg';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
    {
        name: 'Clothing',
        image: clothing,
    },
    {
        name: 'Footwear',
        image: footwear,
    },
    {
        name: 'Accessories',
        image: accessories,
    },
    {
        name: 'Casual',
        image: casual,
    },
];

export default function CategorySelection() {
    return (
        <div className='mx-auto my-12 max-w-7xl'>
            <h2 className='text-xl font-semibold text-primary'>Features Categories</h2>
            <div className='mt-7 flex gap-4'>
                {CATEGORIES.map(category => (
                    <CategoryCard key={category.name} {...category} />
                ))}
            </div>
        </div>
    );
}

type CategoryCardProps = {
    name: string;
    image: StaticImageData;
    key: string;
};

function CategoryCard({ name, image }: CategoryCardProps) {
    return (
        <div className='relative aspect-square w-full overflow-hidden rounded-md border border-gray-400'>
            <div className='absolute inset-0 bg-[rgb(0,0,0,0.40)]'></div>
            <Image src={image} alt={`Shop ${name}`} layout='fill' objectFit='cover' className='-z-10' />
            <button className='absolute bottom-5 left-1/2 flex w-[75%] -translate-x-1/2 items-center justify-between rounded border border-gray-400 bg-white px-4 py-3 text-xs font-semibold'>
                Shop {name} <ArrowRight size={17} />
            </button>
        </div>
    );
}
