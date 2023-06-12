import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
    return (
        <>
            <Skeleton height={25} width={300} className='mb-4 mt-5' />
            <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex w-full flex-col gap-2 md:w-1/2 md:max-w-xl'>
                    <Skeleton className='aspect-square w-full' />
                    <div className='grid grid-cols-4 gap-4'>
                        <Skeleton className='aspect-square w-full' />
                        <Skeleton className='aspect-square w-full' />
                        <Skeleton className='aspect-square w-full' />
                    </div>
                </div>

                <div className='w-full divide-y-2 divide-gray-100 md:w-1/2'>
                    <div className='flex flex-col gap-2 pb-4'>
                        <Skeleton count={1} width={180} height={30} />
                        <Skeleton count={1} width={100} height={25} />
                    </div>

                    <div className='flex flex-col gap-2 py-4'>
                        <Skeleton count={1} height={25} />
                        <Skeleton count={3} />
                    </div>

                    <div className='py-4'>
                        <Skeleton count={1} />
                        <Skeleton count={1} />
                    </div>

                    <div className='py-4'>
                        <Skeleton count={1} />
                        <Skeleton count={1} />
                    </div>

                    <div className='py-4'>
                        <Skeleton count={1} height={40} width={170} />
                    </div>
                </div>
            </div>
        </>
    );
}
