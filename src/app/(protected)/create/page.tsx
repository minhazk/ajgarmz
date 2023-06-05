'use client';

import NavigationHistory from '@/components/ui/NavigationHistory';
import { MultiSelect, MultiSelectCreatable } from '@/components/create/SelectOptions';
import { FormEvent, useState } from 'react';
import { FileImage } from 'lucide-react';
import ImageInput from '@/components/create/ImageInput';
import ItemImage, { ImagesStateProps } from '@/components/create/ItemImage';
import { colours, genders, itemCategories, itemTypes, sizes } from '@/components/create/data';
import { api } from '@/util/trpc';

export default function Page() {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColours, setSelectedColours] = useState<string[]>([]);
    const [gender, setGender] = useState<string[]>([]);
    const [category, setCategory] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [images, setImages] = useState<ImagesStateProps>({
        mainImage: null,
        images: [],
    });

    const createItem = api.items.createItem.useMutation({
        onSuccess(data, variables, context) {
            console.log('item created', data, variables, context);
        },
        onError(error) {
            console.log('There was an error creating your item.');
        },
    });

    const handleCreateItem = (e: FormEvent) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const name = form.get('item title')!.toString();
        const description = form.get('item description')!.toString();
        const price = parseFloat(form.get('item price')!.toString());
        const item = { name, description, price, sizes: selectedSizes, colours: selectedColours, gender: gender.length !== 1 ? 'unisex' : gender[0], category, type };
        console.log(item);
        if (
            Object.values(item).some(val => {
                if (typeof val == 'string') return val == '';
                if (typeof val == 'number') return val < 0.01;
                return val?.length == 0;
            })
        )
            return alert('Fill all inputs');
        void createItem.mutate(item);
    };

    const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = Array.prototype.slice.call(e.target.files);
        for (let image of images) {
            image.objectURL = URL.createObjectURL(image);
        }
        setImages((prev: ImagesStateProps) => ({ mainImage: prev.mainImage != null || prev.images.length !== 0 ? prev.mainImage : images[0] ?? null, images: [...prev.images, ...images] }));
    };

    return (
        <div>
            <NavigationHistory routes={['Create Listing']} />

            <div className='flex flex-col gap-8 lg:flex-row'>
                <div className='lg:w-1/2'>
                    <h1 className='text-xl font-semibold text-slate-600'>Item Images</h1>

                    <div className='mt-5'>
                        <div className={`${images.mainImage != null ? 'mb-10' : 'mb-4'} mt-4 flex flex-wrap gap-2 md:gap-4`}>
                            {images.images.length === 0
                                ? Array.from({ length: 2 }).map((_, i) => (
                                      <div key={i} className='flex aspect-square w-24 items-center justify-center overflow-hidden rounded-lg border border-gray-300 p-2 lg:w-32'>
                                          <FileImage size={32} className='text-gray-300' />
                                      </div>
                                  ))
                                : images.images.map((image, i) => <ItemImage key={i} image={image} setImages={setImages} images={images} />)}
                        </div>
                        <ImageInput onChange={onImageInput} />
                    </div>
                </div>

                <div className='lg:w-1/2'>
                    <h1 className='text-xl font-semibold text-slate-600'>Item Details</h1>

                    <form onSubmit={handleCreateItem}>
                        <InputGroup label='Item title' />
                        <InputGroup label='Item description' />
                        <InputGroup label='Item price' type='number' />

                        <MultiSelectCreatable setter={setSelectedSizes} options={sizes} label='Available Sizes' isMulti />

                        <MultiSelectCreatable setter={setSelectedColours} options={colours} label='Available Colours' isMulti />

                        <MultiSelect setter={setGender} options={genders} isMulti label='Assign Gender' />

                        <MultiSelectCreatable setter={setCategory} options={itemCategories} label='Item Category' />

                        <MultiSelect setter={setType} options={itemTypes} label='Item Type' />

                        <button type='submit' className='w-full rounded-md border border-slate-600 bg-slate-600 px-5 py-2 text-sm text-white transition-opacity hover:opacity-75'>
                            Create Listing
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

type InputGroupProps = {
    label: string;
    type?: string;
};

function InputGroup({ label, ...inputProps }: InputGroupProps) {
    return (
        <div className='my-4 flex flex-col gap-2'>
            <label className='text-sm font-medium' htmlFor={label.toLowerCase()}>
                {label}
            </label>
            <input
                id={label.toLowerCase()}
                name={label.toLowerCase()}
                {...inputProps}
                className='rounded-md border border-gray-300 p-2 text-sm outline-none transition-colors focus-within:border-slate-400'
                placeholder='Type here'
            />
        </div>
    );
}
