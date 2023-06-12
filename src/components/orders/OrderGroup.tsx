import Image from 'next/image';
import { ReactNode, useState } from 'react';

export type OrderItemProps = {
    id: number;
    orderId: string;
    userId: number;
    colour: string;
    size: string;
    quantity: number;
    amountPaid: number;
    createdAt: Date;
    shippingCost: number;
    item: {
        id: number;
        name: string;
        price: number;
        mainImage: {
            url: string;
        };
    };
    address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
        recipientName: string;
    };
};

export default function OrderGroup({ orderItems }: { orderItems: OrderItemProps[] }) {
    const [expanded, setExpanded] = useState(false);
    const addressData = Object.values(orderItems[0].address);

    return (
        <div>
            <div className='rounded-lg border border-gray-300 px-6 py-4'>
                <h2 className='text-sm font-semibold text-slate-600 sm:text-base'>
                    Order ID: <span className='font-normal'>{orderItems[0].orderId}</span>
                </h2>
                <div className='my-4 flex gap-4'>
                    <div className='my-3'>
                        {addressData.map(data => (
                            <p className='text-xs text-slate-500 first:font-semibold' key={data}>
                                {data}
                            </p>
                        ))}
                    </div>
                    <div className='grid w-full grid-cols-2 items-center justify-items-center gap-2 md:grid-cols-4 md:gap-4'>
                        <ItemData label='Created at' value={'12.02.23'} />
                        <ItemData label='No. of Items' value={orderItems.length} />
                        <ItemData label='Order charge' value={orderItems.reduce((prev, curr) => prev + curr.amountPaid, 0)} />
                        <ItemData label='Shipping' value={orderItems[0].shippingCost === 0 ? 'Standard' : 'Next Day'} />
                    </div>
                </div>
                {expanded && (
                    <div className='my-3 flex flex-col gap-3'>
                        {orderItems.map(order => (
                            <OrderItem key={order.id} {...order} />
                        ))}
                    </div>
                )}
                <button onClick={() => setExpanded(p => !p)} className='mx-auto block w-fit rounded-md px-4 py-2 text-sm text-slate-500'>
                    {expanded ? 'Hide' : 'View'} Items
                </button>
            </div>
        </div>
    );
}

function OrderItem({ colour, size, quantity, item }: OrderItemProps) {
    const { id: itemId, name: itemName, price, mainImage } = item;

    return (
        <div className='grid grid-cols-4 items-center justify-items-center gap-3 rounded-lg border border-gray-300 px-3 py-2 md:grid-cols-[auto_auto_repeat(5,1fr)]'>
            <ItemData label='ID' value={itemId} />
            <div className='relative mx-4 aspect-square w-16 overflow-hidden rounded-md'>
                <Image src={mainImage.url} alt={itemName} className='w-full object-cover' fill />
            </div>
            <ItemData label='Name' value={itemName} />
            <ItemData label='Price' value={price} />
            <ItemData label='Colour' value={colour} />
            <ItemData label='Size' value={size} />
            <ItemData label='Quantity' value={quantity} />
        </div>
    );
}

function ItemData({ label, value }: { label: string; value: string | number | ReactNode }) {
    return (
        <div className='flex flex-col gap-2 px-1 text-center'>
            <p className='text-xs font-medium text-slate-600 sm:text-sm'>{label}</p>
            <p className='max-w-[150px] overflow-hidden text-ellipsis text-xs text-slate-500 sm:text-sm' style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                {value}
            </p>
        </div>
    );
}
