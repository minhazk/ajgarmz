'use client';

import NavigationHistory from '@/components/ui/NavigationHistory';
import { MultiSelect, MultiSelectCreatable } from '@/components/create/SelectOptions';
import { FormEvent, useState } from 'react';
import { FileImage } from 'lucide-react';
import ImageInput from '@/components/create/ImageInput';
import ItemImage, { ImagesStateProps } from '@/components/create/ItemImage';
import { colours, genders, itemCategories, itemTypes, sizes } from '@/components/create/data';
import { api } from '@/util/trpc';
import { showToast } from '@/util/toastNotification';
import CustomButton from '@/components/ui/CustomButton';
import { UploadDropzone } from '@/util/uploadthing';
import Image from 'next/image';
import { UploadFileResponse } from 'uploadthing/client';
import Select from 'react-select';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

type ImageFile = UploadFileResponse & {
    colour?: string;
    main?: boolean;
};

export default function Page() {
    const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
    const [selectedColours, setSelectedColours] = useState<any[]>([]);
    const [gender, setGender] = useState<any[]>([]);
    const [category, setCategory] = useState<any>('');
    const [type, setType] = useState<any>('');
    const [newImages, setNewImages] = useState<ImageFile[]>([]);
    const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);

    console.log('newImages', newImages);

    const createItem = api.items.createItem.useMutation({
        onSuccess() {
            showToast('Item successfully created');
            setNewImages([]);
        },
        onError(err) {
            showToast('There was an error creating your item.');
            console.log(err);
        },
    });

    const handleCreateItem = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('item title')!.toString();
        const description = formData.get('item description')!.toString();
        const price = parseFloat(formData.get('item price')!.toString());
        const item = {
            name,
            description,
            price,
            sizes: selectedSizes.map(v => v.value),
            colours: selectedColours.map(colour => colour.value.toLowerCase()),
            gender: gender.length !== 1 ? 'unisex' : gender[0].value.toLowerCase(),
            category: category.value.toLowerCase(),
            type: type.value.toLowerCase(),
            images: newImages
                .filter(img => !img.main)
                .map(img => {
                    return { url: img.url };
                }),
            mainImage: newImages.find(img => img.main)!.url,
        };
        console.log(item);
        if (
            Object.values(item).some(val => {
                if (typeof val == 'string') return val == '';
                if (typeof val == 'number') return val < 0.01;
                return !val;
            })
        )
            return showToast('Fill all inputs');
        createItem.mutate(item);
        if (createItem.isSuccess) form.reset();
    };

    return (
        <div>
            <NavigationHistory routes={['admin', 'create listing']} />

            <div className='flex flex-col gap-8 lg:flex-row'>
                <div className='lg:w-1/2'>
                    <h1 className='text-xl font-semibold text-slate-600'>Item Images</h1>

                    <div className='mt-5'>
                        <UploadDropzone
                            endpoint='imageUploader'
                            onClientUploadComplete={res => {
                                console.log('Files: ', res);
                                console.log('Upload Completed');
                                if (res)
                                    setNewImages(prev => [
                                        ...prev,
                                        ...res.map((file, i) => {
                                            return { ...file, main: prev.length === 0 && i === 0 };
                                        }),
                                    ]);
                            }}
                            onUploadProgress={setImageUploadProgress}
                            onUploadError={(error: Error) => {
                                showToast('There was an error uploading your images');
                                console.log(`ERROR! ${error.message}`);
                            }}
                        />
                        {imageUploadProgress !== null && imageUploadProgress !== 100 && (
                            <div className='mx-auto mb-4 mt-5 w-[95%] overflow-hidden rounded-lg border border-gray-300'>
                                <div
                                    className='bg-primary text-center text-xs text-white transition-all duration-300'
                                    style={{
                                        width: `${imageUploadProgress}%`,
                                    }}
                                >
                                    {imageUploadProgress}%
                                </div>
                            </div>
                        )}
                        <p className='mt-3 px-5 text-center text-xs text-gray-400'>
                            The blue upload button just saves the image in a storage bucket. The item is not created until the grey &apos;Create Listing&apos; button is clicked.
                        </p>

                        {newImages.length !== 0 && (
                            <div className='mt-5 flex flex-col gap-2'>
                                {newImages.map((image: ImageFile, i: number) => (
                                    <div key={image.key} className='flex gap-3 rounded-lg border border-gray-300 p-2'>
                                        <div className='relative aspect-square w-20 shrink-0 overflow-hidden rounded-md lg:w-24'>
                                            <Image src={image.url} fill className='aspect-square w-full object-cover' alt={image.name} />
                                        </div>
                                        <div className='flex w-full flex-col gap-1 text-xs md:text-sm'>
                                            <div className='mt-2 flex items-center gap-3'>
                                                <label className='whitespace-nowrap text-sm'>Assign colour</label>
                                                <Select
                                                    className='w-full'
                                                    options={selectedColours}
                                                    closeMenuOnSelect
                                                    onChange={(selected: any) => {
                                                        setNewImages((prev: any) => {
                                                            return prev.map((file: any) => {
                                                                if (file !== image) return file;
                                                                return { ...file, colour: selected.value };
                                                            });
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className='mt-2 flex items-center gap-3'>
                                                <label className='text-sm' htmlFor={image.name}>
                                                    Mark as Main Image
                                                </label>
                                                <Toggle
                                                    id={image.name}
                                                    checked={image.main}
                                                    onChange={e => {
                                                        setNewImages((prev: any) => {
                                                            return prev.map((file: any, i: number) => {
                                                                const isChecked = e.target.checked;
                                                                if (file !== image) return { ...file, main: !isChecked ? (i === 0 ? true : file.main) : false };
                                                                return { ...file, main: isChecked };
                                                            });
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='lg:w-1/2'>
                    <h1 className='text-xl font-semibold text-slate-600'>Item Details</h1>

                    <form onSubmit={handleCreateItem}>
                        <InputGroup label='Item title' />
                        <InputGroup label='Item description' />
                        <InputGroup label='Item price' type='number' />

                        <MultiSelectCreatable setter={setSelectedSizes} options={sizes} label='Available Sizes' isMulti insertAll />

                        <MultiSelectCreatable setter={setSelectedColours} options={colours} label='Available Colours' isMulti insertAll />

                        <MultiSelect setter={setGender} options={genders} isMulti label='Assign Gender' insertAll />

                        <MultiSelectCreatable setter={setCategory} options={itemCategories} label='Item Category' />

                        <MultiSelect setter={setType} options={itemTypes} label='Item Type' />

                        <CustomButton disabled={createItem.isLoading} type='submit'>
                            Create Listing
                        </CustomButton>
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
