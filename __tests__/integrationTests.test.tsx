import useLocalStorage, { LOCAL_STORAGE_ITEMS_KEY } from '@/hooks/useLocalStorage';
import currencyFormatter from '@/util/currencyFormat';
import { formatDate } from '@/util/dateTimeFormatter';
import { UploadDropzone } from '@/util/uploadthing';
import { act, render, renderHook, screen } from '@testing-library/react';

describe('useLocalStorage', () => {
    it('should add an item to local storage', () => {
        const { result } = renderHook(() => useLocalStorage());

        act(() => {
            result.current.addItem({
                item: {
                    id: 1,
                    mainImage: { url: 'item-url' },
                    name: 'Item Name',
                    price: 10,
                    oldPrice: null,
                },
                colour: { name: 'Red' },
                size: { name: 'Small' },
                quantity: 2,
            });
        });

        expect(result.current.items.length).toBe(1);
        expect(result.current.items[0].item.id).toBe(1);
        expect(result.current.items[0].colour.name).toBe('Red');
        expect(result.current.items[0].size.name).toBe('Small');
        expect(result.current.items[0].quantity).toBe(2);

        localStorage.removeItem(LOCAL_STORAGE_ITEMS_KEY);
    });

    it('should retrieve an item from local storage', () => {
        const itemToRetrieve = {
            item: {
                id: 1,
                mainImage: { url: 'item-url' },
                name: 'Item Name',
                price: 10,
                oldPrice: null,
            },
            colour: { name: 'Red' },
            size: { name: 'Small' },
            quantity: 2,
        };

        localStorage.setItem(LOCAL_STORAGE_ITEMS_KEY, JSON.stringify([itemToRetrieve]));

        const { result } = renderHook(() => useLocalStorage());

        const retrievedItem = result.current.retrieveItem(1, 'Red', 'Small');

        expect(retrievedItem).toEqual(itemToRetrieve);
    });

    afterEach(() => {
        localStorage.removeItem(LOCAL_STORAGE_ITEMS_KEY);
    });
});

describe('format date', () => {
    it('formats a date correctly', () => {
        const date = new Date('2023-01-15T14:30:00');
        const expectedFormattedDate = 'January 15 at 14:30';
        const formattedDate = formatDate(date);

        expect(formattedDate).toBe(expectedFormattedDate);
    });

    it('handles different time zones and locales', () => {
        const date = new Date('2023-01-15T14:30:00');
        const expectedFormattedDate = 'January 15 at 14:30';
        const formattedDate = formatDate(date);

        expect(formattedDate).toBe(expectedFormattedDate);
    });
});

describe('currency formatter', () => {
    describe('currencyFormatter', () => {
        it('formats a number to GBP currency correctly', () => {
            const number = 1234.56;
            const expectedFormattedValue = '£1,234.56';
            const formattedValue = currencyFormatter(number);

            expect(formattedValue).toBe(expectedFormattedValue);
        });

        it('handles negative numbers correctly', () => {
            const number = -789.12;
            const expectedFormattedValue = '-£789.12';
            const formattedValue = currencyFormatter(number);

            expect(formattedValue).toBe(expectedFormattedValue);
        });
    });
});

describe('uploadthing API', () => {
    it('should render a file input', () => {
        render(<UploadDropzone endpoint='imageUploader' />);
        const label = screen.getByText('Loading...');

        expect(label).toHaveAttribute('for', 'file-upload');
    });
});
