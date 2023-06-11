import { useState, useEffect } from 'react';

const LOCAL_STORAGE_ITEMS_KEY = 'AJGARMZ_guest_basket';

type LocalStorageItem = {
    item: { id: number; mainImage: { url: string } | null; name: string; price: number; oldPrice: number | null };
    colour: { name: string };
    size: { name: string };
    quantity: number;
};

const useLocalStorage = () => {
    const [value, setValue] = useState<LocalStorageItem[]>([]);

    useEffect(() => {
        const storedItems = localStorage.getItem(LOCAL_STORAGE_ITEMS_KEY);
        if (storedItems) {
            setValue(JSON.parse(storedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify(value));
    }, [value]);

    const addItem = (item: LocalStorageItem) => {
        setValue((prev: LocalStorageItem[]) => {
            const basketItem = retrieveItem(item.item.id, item.colour.name, item.size.name);
            if (basketItem == null) return [...prev, item];
            return [
                ...prev.map(p => {
                    if (p !== basketItem) return p;
                    p.quantity += item.quantity;
                    return p;
                }),
            ];
        });
    };

    const removeItem = (itemId: number, colour: string, size: string) => {
        setValue((prev: LocalStorageItem[]) => {
            const basketItem = retrieveItem(itemId, colour, size);
            return [
                ...prev
                    .map(item => {
                        if (basketItem !== item) return item;
                        item.quantity -= 1;
                        return item;
                    })
                    .filter(item => item.quantity < 1),
            ];
        });
    };

    const retrieveItem = (itemId: number, colour: string, size: string) => {
        return value.find(item => item.item.id === itemId && item.colour.name === colour && item.size.name === size);
    };

    return { items: value, addItem, removeItem, retrieveItem };
};

export default useLocalStorage;
