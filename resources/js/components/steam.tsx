import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter';
import { useGlobalStore } from '@/store/global';
import { Category, StreamSolo } from '@/types/stream';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import Heading from './heading';
import Nugget from './nugget';
interface Props {
    hideTitle?: boolean;
    stream: StreamSolo;
    categories?: Category[];
    isAllowed?: boolean;
}
const Stream = ({ hideTitle, stream, categories, isAllowed }: Props) => {
    console.log("🚀 ~ Stream ~ categories:", categories)
    const { setSelectedCategories, clearFilters } = useFilterStore();
    const { displayPaywall } = useGlobalStore();

    const handleStreamCategoryClick = (category: string) => {
        if (!isAllowed) {
            displayPaywall(true);
            return;
        }
        const findCategory = categories?.find((cat) => cat.title === category);
        console.log("🚀 ~ handleStreamCategoryClick ~ findCategory:", findCategory)
        if (!findCategory) return;
        clearFilters();
        setSelectedCategories([findCategory.id]);
        router.visit(route('releases.index'));
    };

    return (
        <>
            <Head title={stream.description} />
            {!hideTitle && (
                <section className="lg:off-center-container">
                    <div className="flex flex-col-reverse bg-black lg:flex-row lg:items-center">
                        <p className="text-background border-r-background flex-1 px-5 py-5 text-2xl md:text-3xl lg:border-r lg:px-10">
                            In this stream:&nbsp;
                            <span className="font-bold">{stream.description}</span>
                        </p>
                        <Heading dark className="px-5 pt-5 lg:min-w-[500px] lg:px-10 lg:pt-0">
                            {dayjs(stream.date).format('DD/MM/YYYY')}
                        </Heading>
                    </div>
                </section>
            )}
            <div className="lg:off-center-container">
                <section className="lg:border">
                    {stream.nugget_groups.map((nugget, index) => (
                        <div
                            key={nugget.category_id}
                            className={cn('border-b px-5 py-5 lg:px-10', index === stream.nugget_groups.length - 1 && 'border-b-0')}
                        >
                            <p
                                role="button"
                                onClick={() => handleStreamCategoryClick(nugget.category_title)}
                                className="text-primary mb-2.5 cursor-pointer text-3xl font-bold underline lg:mb-10"
                            >
                                {nugget.category_title}
                            </p>
                            <div className="lg:space-y-5">
                                {nugget.nuggets.map((nugget) => (
                                    <Nugget
                                        nugget={nugget}
                                        key={nugget.id}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default Stream;
