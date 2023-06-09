type OptionProps = {
    value: string;
    label: string;
}[];

export const sizes: OptionProps = [
    { value: 'XXL', label: 'XXL' },
    { value: 'XL', label: 'XL' },
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'S', label: 'S' },
    { value: 'XS', label: 'XS' },
];
export const colours: OptionProps = [
    { value: 'black', label: 'Black' },
    { value: 'white', label: 'White' },
    { value: 'gray', label: 'Gray' },
    { value: 'blue', label: 'Blue' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
];

export const genders: OptionProps = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
];

export const itemCategories: OptionProps = [
    { value: 't-shirts', label: 'T-Shirt' },
    { value: 'hoodies', label: 'Hoodie' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'jumpers', label: 'Jumper' },
    { value: 'jackets', label: 'Jacket' },
    { value: 'watches', label: 'Watch' },
    { value: 'trainers', label: 'Trainers' },
    { value: 'jewellery', label: 'Jewellery' },
];

export const itemTypes: OptionProps = [
    { value: 'clothing', label: 'Clothing' },
    { value: 'footwear', label: 'Footwear' },
    { value: 'accessories', label: 'Accessories' },
];
