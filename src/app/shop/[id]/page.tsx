'use client';

import Image from 'next/image';
import dummy_tee from '../../../assets/dummy_tee.jpg';
import NavigationHistory from '@/components/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import { useState } from 'react';

type PageProps = {
    params: {
        id: string;
    };
};

export default function Page({ params: { id } }: PageProps) {
    const dummyItem = {
        name: 'Christian Dior T-Shirt',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, facilis dolores! Architecto incidunt inventore ipsam enim qui quia nostrum doloremque eligendi cum, corporis veniam ad consequatur, quisquam eius, commodi fugiat!',
        mainImage: dummy_tee,
        price: 85,
        oldPrice: 95,
        sizes: ['XL', 'L', 'M', 'S'],
        colours: ['Red', 'Black'],
        images: [dummy_tee, dummy_tee, dummy_tee, dummy_tee],
    };
    const { name, mainImage, price, oldPrice, sizes, colours, images, description } = dummyItem;
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColour, setSelectedColour] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div>
            <NavigationHistory routes={['Browse Products', name]} />

            <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex w-full flex-col gap-4 md:w-1/2 md:max-w-xl'>
                    <div className='order-2 grid grid-flow-col justify-start gap-2 overflow-auto rounded-md pb-2'>
                        {images.map((image, i) => (
                            <div className='relative aspect-square w-28 cursor-pointer overflow-hidden rounded-md' key={i}>
                                <Image src={image} fill className='asp object-cover' alt={name} />
                            </div>
                        ))}
                    </div>

                    <div className='relative aspect-square w-full overflow-hidden rounded-md'>
                        <Image src={mainImage} alt={name} fill className='cover' />
                    </div>
                </div>

                <div className='w-full divide-y-2 divide-gray-100 md:w-1/2'>
                    <div className='mb-4'>
                        <h1 className='text-lg font-medium text-slate-500'>{name}</h1>
                        <div className='flex items-baseline gap-4'>
                            <p className='text-lg font-bold text-slate-500'>{currencyFormatter(price)}</p>
                            <p className='text-md font-semibold text-slate-300 line-through'>{currencyFormatter(oldPrice)}</p>
                        </div>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Product description</h3>
                        <p className='text-xs text-slate-600 sm:text-sm'>{description}</p>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Available sizes</h3>
                        <div className='flex flex-wrap items-center gap-1'>
                            {sizes.map((size, i) => (
                                <button
                                    onClick={() => setSelectedSize(size)}
                                    className={`flex w-10 items-center justify-center rounded-md border p-2 text-sm font-medium transition-colors ${
                                        selectedSize === size ? 'border-white bg-slate-600 text-white' : 'border-gray-300 bg-white text-slate-500 hover:bg-slate-50'
                                    }`}
                                    key={i}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Available colours</h3>
                        <div className='flex flex-wrap items-center gap-1'>
                            {colours.map((colour, i) => (
                                <button
                                    onClick={() => setSelectedColour(colour)}
                                    className={`flex items-center justify-center rounded-md border p-2 text-sm font-medium transition-colors ${
                                        selectedColour === colour ? 'border-white bg-slate-600 text-white' : 'border-gray-300 bg-white text-slate-500 hover:bg-slate-50'
                                    }`}
                                    key={i}
                                >
                                    {colour}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-3 py-4'>
                        <div className='flex w-fit divide-x-2 divide-gray-100 rounded-md border border-gray-200 p-2 font-semibold'>
                            <button onClick={() => setQuantity(prev => (prev === 1 ? 1 : prev - 1))} className='px-2'>
                                -
                            </button>
                            <p className='flex w-10 items-center justify-center px-2 text-sm text-slate-600'>{quantity}</p>
                            <button onClick={() => setQuantity(prev => prev + 1)} className='px-2'>
                                +
                            </button>
                        </div>
                        <button className='rounded-md border border-slate-600 bg-slate-600 px-5 text-sm text-white transition-opacity hover:opacity-75'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
