'use client';

import Image from 'next/image';
import dummy_tee from '../../../assets/dummy_tee.jpg';
import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import { useEffect, useState } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';

type PageProps = {
    params: {
        id: string;
    };
};

type InputProps = {
    id: number;
    name: string;
};

export default function Page({ params: { id } }: PageProps) {
    const { data: session } = useSession();
    const [selectedSize, setSelectedSize] = useState<InputProps>();
    const [selectedColour, setSelectedColour] = useState<InputProps>();
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImage, setSelectedImage] = useState<string>();

    const addToBasket = api.items.addToBasket.useMutation({
        onSuccess(data, variables, context) {
            console.log('item added', data, variables, context);
        },
        onError(error) {
            console.log('There was an error adding your item.');
        },
    });

    if (isNaN(Number(id)) || id == null) return <div>404</div>;
    const { data } = api.items.getItem.useQuery(Number(id));
    if (!data) return <div>404</div>;
    const { name, description, mainImage, price, oldPrice, sizes, colours, images } = data;

    const handleAddToBasket = () => {
        if (session?.user.id == null) return alert('Please login to add items');
        if (selectedSize == null) return alert('Please choose a size');
        if (selectedColour == null) return alert('Please choose a colour');
        void addToBasket.mutate({
            userId: session.user.id,
            itemId: Number(id),
            sizeId: selectedSize.id,
            colourId: selectedColour.id,
            quantity,
        });
    };

    return (
        <div>
            <NavigationHistory routes={['Browse Products', name]} />

            <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex w-full flex-col gap-4 md:w-1/2 md:max-w-xl'>
                    <div className='order-2 grid grid-flow-col justify-start gap-2 overflow-auto rounded-md pb-2'>
                        {[mainImage as { id: number; url: string }, ...images].map(({ id, url }: { id: number; url: string }) => (
                            <div
                                onClick={() => setSelectedImage(url)}
                                className='relative aspect-square w-28 cursor-pointer overflow-hidden rounded-md border-2 border-transparent hover:border-slate-300'
                                key={id}
                            >
                                <Image src={url} fill className='object-cover' alt={name} />
                            </div>
                        ))}
                    </div>

                    <div className='relative aspect-square w-full overflow-hidden rounded-md'>
                        <Image src={selectedImage ?? mainImage!.url} alt={name} fill className='object-cover' />
                    </div>
                </div>

                <div className='w-full divide-y-2 divide-gray-100 md:w-1/2'>
                    <div className='mb-4'>
                        <h1 className='text-lg font-medium text-slate-500'>{name}</h1>
                        <div className='flex items-baseline gap-4'>
                            <p className='text-lg font-bold text-slate-500'>{currencyFormatter(price)}</p>
                            {oldPrice != null && <p className='text-md font-semibold text-slate-300 line-through'>{currencyFormatter(oldPrice)}</p>}
                        </div>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Product description</h3>
                        <p className='text-xs text-slate-600 sm:text-sm'>{description}</p>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Available sizes</h3>
                        <div className='flex flex-wrap items-center gap-1'>
                            {sizes.map((size: InputProps) => (
                                <button
                                    onClick={() => setSelectedSize(size)}
                                    className={`flex w-10 items-center justify-center rounded-md border p-2 text-sm font-medium transition-colors ${
                                        selectedSize?.name === size.name ? 'border-white bg-slate-600 text-white' : 'border-gray-300 bg-white text-slate-500 hover:bg-slate-50'
                                    }`}
                                    key={size.id}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='py-4'>
                        <h3 className='text-md mb-3 font-medium text-slate-600'>Available colours</h3>
                        <div className='flex flex-wrap items-center gap-1'>
                            {colours.map((colour: InputProps) => (
                                <button
                                    onClick={() => setSelectedColour(colour)}
                                    className={`flex items-center justify-center rounded-md border p-2 text-sm font-medium transition-colors first-letter:uppercase ${
                                        selectedColour?.name === colour.name ? 'border-white bg-slate-600 text-white' : 'border-gray-300 bg-white text-slate-500 hover:bg-slate-50'
                                    }`}
                                    key={colour.id}
                                >
                                    {colour.name}
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
                        <CustomButton onClick={handleAddToBasket}>Add to cart</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
