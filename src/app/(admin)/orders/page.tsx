'use client';

import OrderItem, { OrderItemProps } from '@/components/orders/OrderGroup';
import NavigationHistory from '@/components/ui/NavigationHistory';
import { api } from '@/util/trpc';
import { Calendar, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Page() {
    const { data: stats } = api.admin.getOrderStats.useQuery();
    const { data: ordersPages, hasNextPage, fetchNextPage, isLoading } = api.admin.getOrders.useInfiniteQuery({});
    const [groupedOrders, setGroupedOrders] = useState([]);

    useEffect(() => {
        if (!ordersPages) return;
        const orders = ordersPages.pages.map(page => page.items).flat();
        const grouped = {} as any;
        orders.forEach(order => {
            grouped[order.orderId] ||= [];
            grouped[order.orderId].push(order);
        });
        setGroupedOrders(Object.values(grouped));
    }, [ordersPages]);

    return (
        <div>
            <NavigationHistory routes={['admin', 'orders']} />

            <div className='grid grid-cols-2 gap-4'>
                <div className='flex w-full flex-col items-center justify-center gap-3 rounded-md border border-gray-300 bg-gray-200 p-2 py-4 text-slate-500'>
                    <Calendar size={30} />
                    <p className='text-lg font-semibold md:text-3xl'>{stats?.week ?? 0}</p>
                    <p className='text-sm'>This week</p>
                </div>

                <div className='flex w-full flex-col items-center justify-center gap-3 rounded-md border border-gray-300 bg-gray-200 p-2 py-4 text-slate-500'>
                    <CalendarDays size={30} />
                    <p className='text-lg font-semibold md:text-3xl'>{stats?.all ?? 0}</p>
                    <p className='text-sm'>All time</p>
                </div>
            </div>

            <div className='mt-6'>
                <h1 className='text-xl font-semibold text-slate-600'>Customer Orders</h1>

                <div className='my-5 flex flex-col gap-4'>{groupedOrders.length !== 0 && groupedOrders.map((order: OrderItemProps[]) => <OrderItem key={order[0].id} orderItems={order} />)}</div>

                {hasNextPage && (
                    <div className='my-5 flex justify-center'>
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isLoading}
                            className='rounded-md border border-gray-200 px-4 py-2 text-xs text-slate-400 transition-colors hover:bg-gray-50 sm:text-sm'
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
