import Nugget from '@/components/nugget';
import Search from '@/components/search';
import StreamHeader from '@/components/stream-header';
import { Button } from '@/components/ui/button';
import { useReleases } from '@/hooks/use-releases';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter';
import { SharedData } from '@/types';
import { Category, Nugget as NuggetType } from '@/types/stream';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    releases: {
        data: NuggetType[];
        last_page: number;
        current_page: number;
        total: number;
        per_page: number;
    };

    categories: Category[];
}

const ReleasePage = ({ releases, categories }: Props) => {
    const page = usePage<SharedData>();
    const { user } = page.props.auth;
    const [searchTrigger, setSearchTrigger] = useState<Date>();
    const {
        selectedStates,
        setSelectedStates,
        selectedLGAs,
        setSelectedLGAs,
        selectedCategories,
        setSelectedCategories,
        dateRange: date,
        setDateRange: setDate,
        setSearchTerm,
        searchTerm,
    } = useFilterStore();

    const { nuggets, loadMore, hasMorePages, isLoadingMore } = useReleases({
        initialData: releases,
        categories: selectedCategories,
        lgas: selectedLGAs,
        states: selectedStates,
        search: searchTerm,
        date: date,
        trigger: searchTrigger,
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

    return (
        <Layout>
            {!searchTerm && (
                <div className="off-center-container-no-padding">
                    <Search
                        selectedLGAs={selectedLGAs}
                        setSelectedLGAs={setSelectedLGAs}
                        selectedStates={selectedStates}
                        setSelectedStates={setSelectedStates}
                        date={date}
                        onSearch={() => setSearchTrigger(new Date())}
                        setDate={setDate}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
            )}

            <main className="off-center-container">
                <StreamHeader
                    title="The following releases contain your search term:"
                    buttonText="Clear"
                    action={() => {
                        setSearchTerm('');
                        router.visit(route('home'));
                    }}
                />
                {nuggets.map((nugget, index) => (
                    <Nugget
                        id={nugget.id}
                        is_saved={nugget.is_saved}
                        key={nugget.id}
                        description={nugget.description}
                        date={dayjs(nugget.date).format('DD/MM/YYYY')}
                        location={nugget.state}
                        lga={nugget.lga}
                        className={cn('border-b lg:px-10', index === 0 && 'border-t')}
                        url={nugget.url}
                    />
                ))}
                {user && hasMorePages ? (
                    <Button className="my-5 rounded-full" size={'lg'} disabled={isLoadingMore} onClick={() => loadMore()}>
                        {isLoadingMore && <Loader2 className="animate-spin" />}
                        Load more
                    </Button>
                ) : (
                    <p className="py-10">This is the end</p>
                )}
            </main>
        </Layout>
    );
};

export default ReleasePage;
