import { LucideIcon, Truck, Mailbox, Laugh, MessageCircle } from 'lucide-react';

const INFO = [
    {
        Icon: Laugh,
        title: 'Satisfaction Guarantee',
        description: "Shop with confidence knowing that you can exchange the product you've purchased if it doesn't fit you.",
    },
    {
        Icon: Mailbox,
        title: 'New Arrivals Every Month',
        description: 'Stay on-trend with our ever-evolving collection as we update our collection every week',
    },
    {
        Icon: Truck,
        title: 'Fast & Free Shipping',
        description: 'Experience lightning-fast and free shipping on all orders with our next day delivery service,',
    },
    {
        Icon: MessageCircle,
        title: '24/7 Customer Support',
        description: 'Our dedicated support team is available 24/7 to assist you with any questions.',
    },
];

export default function InfoBanner() {
    return (
        <div className='max-w-8xl mx-auto my-8'>
            <h2 className='text-center text-base font-semibold text-primary md:text-left lg:text-xl'>We provide best customer experiences</h2>
            <div className='mt-7 grid grid-cols-2 gap-8 md:grid-cols-4'>
                {INFO.map((info, i) => (
                    <InfoCard key={i} {...info} />
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
            <p className='text-center text-sm font-semibold md:text-left xl:text-base whitespace-nowrap'>{title}</p>
            <p className='text-xs text-gray-400 xl:text-sm text-center md:text-left'>{description}</p>
        </div>
    );
}
