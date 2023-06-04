import Carousel from '@/components/home/Carousel';
import CategorySelection from '@/components/home/CategorySelection';
import InfoBanner from '@/components/home/InfoBanner';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
    return (
        <>
            <Carousel />
            <InfoBanner />
            <CategorySelection />
            <Newsletter />
        </>
    );
}
