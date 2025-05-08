import Search from '@/components/search';
import Stream from '@/components/steam';
import { Button } from '@/components/ui/button';
import { useStream } from '@/hooks/use-stream';
import Layout from '@/layouts/layout';
import { useFilterStore } from '@/store/filter';
import { SharedData } from '@/types';
import { Category, StreamGrouped as StreamType } from '@/types/stream';
import { router, usePage } from '@inertiajs/react';

interface Props {
    stream: StreamType;
    categories: Category[];
}
export default function Welcome({ stream, categories }: Props) {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;

    const {
        selectedStates,
        setSelectedStates,
        selectedLGAs,
        setSelectedLGAs,
        selectedCategories,
        setSelectedCategories,
        dateRange: date,
        setDateRange: setDate,
    } = useFilterStore();


    const { streams, hasMorePages, loadMore, isLoadingMore } = useStream({
        initialStream: stream,
    });

    const handleCategorySelect = (categoryId: number) => {
        const currentCategories = [...selectedCategories];
        if (currentCategories.includes(categoryId)) {
            currentCategories.splice(currentCategories.indexOf(categoryId), 1);
        } else {
            currentCategories.push(categoryId);
        }
        setSelectedCategories(currentCategories);
    };

    const handleSearch = () => {
        // Implement search logic here
        router.visit('/releases')
    };
    return (
        <>
            <Layout>
                {user ? (
                    <>
                        <div className="off-center-container-no-padding">
                            <Search
                                onSearch={handleSearch}
                                selectedLGAs={selectedLGAs}
                                setSelectedLGAs={setSelectedLGAs}
                                selectedStates={selectedStates}
                                setSelectedStates={setSelectedStates}
                                date={date}
                                setDate={setDate}
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onCategorySelect={handleCategorySelect}
                            />
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 10%, rgba(0,0,0,0.8) 100%), url('assets/background.png')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'bottom',
                            backgroundRepeat: 'no-repeat',
                        }}
                        // Changed the gradient to go from transparent at top to black at bottom
                        className="my-0 flex min-h-[800px] flex-col items-start bg-gradient-to-b from-transparent to-black text-white"
                    >
                        <section className="off-center-container my-0 flex h-[60%] w-full flex-1 flex-col">
                            <div className="flex-1 border-white lg:border-l"></div>
                        </section>
                        <section className="off-center-container mt-4 mb-0 w-full">
                            <div className="max-w-2xl">
                                <h1 className="mb-4 text-2xl font-bold">ABOUT US</h1>
                                <p className="text-2xl">
                                    RQST simplifies access to essential publicly available information mandated by Australian federal and state
                                    governments—including development applications, tenders, and land-use notices.
                                </p>
                            </div>
                        </section>
                        <section className="off-center-container mt-4 mb-0 w-full">
                            <p className="border-white py-10 text-xl lg:border-l lg:pl-8">
                                RQST is for engineers, architects, urban planners, environmental consultants, community groups and many others.
                                Quickly find, save, and track notifications relevant to your interests, and receive personalised updates directly to
                                your inbox. Stay effortlessly informed by signing up—it's free, simple, and designed to put critical information at
                                your fingertips.
                            </p>
                        </section>
                        <section className="off-center-container flex h-20 w-full">
                            <div className="flex-1 border-white lg:border-t lg:border-r"></div>
                            <div className="lg:min-w-[500px]"></div>
                        </section>
                    </div>
                )}
                <main className="off-center-container">
                    {streams.map((stream) => (
                        <Stream key={stream.id} stream={stream} />
                    ))}

                    {user && hasMorePages ? (
                        <Button className="my-5 rounded-full" size={'lg'} disabled={isLoadingMore} onClick={() => loadMore()}>
                            Load more
                        </Button>
                    ) : (
                        <p className="py-10">This is the end</p>
                    )}
                </main>
            </Layout>
        </>
    );
}
