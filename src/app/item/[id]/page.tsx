'use client';

import Image from 'next/image';
import NavigationHistory from '@/components/ui/NavigationHistory';
import currencyFormatter from '@/util/currencyFormat';
import { useState } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { api } from '@/util/trpc';
import { useSession } from 'next-auth/react';
import { showBanner, showToast } from '@/util/toastNotification';
import useLocalStorage from '@/hooks/useLocalStorage';
import { notFound } from 'next/navigation';
import Loading from '@/components/Item/Loading';
import { useUserContext } from '@/util/UserContext';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

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
    const { addItem } = useLocalStorage();
    const { setBasketCount } = useUserContext();
    const [showNotification, setShowNotification] = useState(false);

    const addToBasket = api.items.addToBasket.useMutation({
        onSuccess() {},
        onError() {
            showToast('There was an error adding your item.');
        },
    });

    if (isNaN(Number(id)) || id == null) return notFound();

    const { data } = api.items.getItem.useQuery(Number(id));

    if (!data) return <Loading />;

    const { name, description, mainImage, price, oldPrice, sizes, colours, images } = data;

    const handleAddToBasket = () => {
        if (selectedSize == null) return showToast('Please choose a size');
        if (selectedColour == null) return showToast('Please choose a colour');
        if (session?.user.id == null) {
            addItem({
                item: {
                    mainImage: mainImage?.url != null ? { url: mainImage.url } : null,
                    name,
                    price,
                    oldPrice,
                    id: Number(id),
                },
                colour: { name: selectedColour.name },
                size: { name: selectedSize.name },
                quantity,
            });
        } else {
            void addToBasket.mutate({
                userId: session.user.id,
                itemId: Number(id),
                sizeId: selectedSize.id,
                colourId: selectedColour.id,
                quantity,
            });
        }
        setBasketCount((prev: number) => prev + 1);
        showBanner(
            <div className='md:first:mt-10 text-sm md:text-base shadow-lg border border-gray-300 py-3 px-4 bg-white rounded-md'>
                <div className='flex items-center gap-3 mx-3 justify-center text-slate-500'>
                    <CheckCircle size={20} strokeWidth={3} className='text-slate-600' /> Item added to basket
                </div>
                <div className='h-px bg-slate-300 w-full my-3 ' />
                <div className='flex items-center gap-5 text-sm'>
                    <div className='w-16 aspect-square rounded-md overflow-hidden relative'>
                        <Image src={selectedImage ?? mainImage!.url} alt={name} fill className='object-cover' />
                    </div>
                    <div className='text-slate-600 flex flex-col gap-1'>
                        <div className='w-full text-start'>
                            <span className='font-semibold'>Colour:</span> {selectedColour?.name}
                        </div>
                        <div className='w-full text-start'>
                            <span className='font-semibold'>Size:</span> {selectedSize?.name}
                        </div>
                    </div>
                </div>
                <Link href='/basket' className='mt-3 flex'>
                    <CustomButton>GO TO CHECKOUT</CustomButton>
                </Link>
            </div>
        );
    };

    console.log(images);

    return (
        <div>
            <NavigationHistory routes={['Browse Products', name]} />

            <div className='absolute top-0 right-0 m-20'></div>

            <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex w-full flex-col gap-4 md:w-1/2 md:max-w-xl'>
                    <div className='order-2 grid grid-flow-col justify-start gap-2 overflow-auto rounded-md pb-2'>
                        {[mainImage as { id: number; url: string }, ...images].map(({ id, url }: { id: number; url: string }) => (
                            <div
                                onClick={() => setSelectedImage(url)}
                                className={`${
                                    (selectedImage ?? mainImage!.url) === url ? 'border-slate-600' : 'border-transparent hover:border-slate-300'
                                } relative aspect-square w-28 cursor-pointer overflow-hidden rounded-md border-2`}
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
                        <h1 className='text-lg font-medium capitalize text-slate-500'>{name}</h1>
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
                                    className={`flex w-10 items-center justify-center rounded-md border p-2 text-sm font-medium capitalize transition-colors ${
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
                                    onClick={() => {
                                        setSelectedColour(colour);
                                        const colourLink = [mainImage, ...images].find(img => img?.colour === colour.name.toLowerCase());
                                        if (colourLink) {
                                            setSelectedImage(colourLink.url);
                                        }
                                    }}
                                    className={`flex items-center justify-center rounded-md border p-2 text-sm font-medium capitalize transition-colors ${
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
                        <CustomButton onClick={handleAddToBasket} disabled={addToBasket.isLoading}>
                            Add to Cart
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
