import { LucideIcon, Truck, Mailbox, Laugh } from 'lucide-react';

const INFO = [
    {
        Icon: Laugh,
        title: 'Satisfaction Guarantee',
        description: "Exchange the product you've purchased if it doesn't fit you",
    },
    {
        Icon: Mailbox,
        title: 'New Arrivals Every Month',
        description: 'We update our collection every month',
    },
    {
        Icon: Truck,
        title: 'Fast & Free Shipping',
        description: 'We offer next day delivery service for every product',
    },
    {
        Icon: Truck,
        title: 'Fast & Free Shipping',
        description: 'We offer next day delivery service for every product',
    },
];

export default function InfoBanner() {
    return (
        <div className='mx-auto my-12 max-w-7xl'>
            <h2 className='text-xl font-semibold text-primary'>We provide best customer experiences</h2>
            <div className='mt-7 grid grid-cols-2 gap-8 md:grid-cols-4'>
                {INFO.map(info => (
                    <InfoCard key={info.title} {...info} />
                ))}
            </div>
        </div>
    );
}

type InfoCardProps = {
    Icon: LucideIcon;
    title: string;
    description: string;
};

function InfoCard({ Icon, title, description }: InfoCardProps) {
    return (
        <div className='flex w-full flex-col items-center gap-2 px-2 md:items-start md:first:pl-0 md:last:pr-0'>
            <div className='aspect-square w-fit rounded bg-gray-100 p-3'>
                <Icon size={20} />
            </div>
            <p className='text-sm font-semibold'>{title}</p>
            <p className='text-xs text-gray-400'>{description}</p>
        </div>
    );
}
