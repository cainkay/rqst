import Nugget from '@/components/nugget';
import Search from '@/components/search';
import StreamHeader from '@/components/stream-header';
import { Button } from '@/components/ui/button';
import { useSavedReleases } from '@/hooks/use-saved-releases';
import Layout from '@/layouts/layout';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter';
import { SharedData } from '@/types';
import { State } from '@/types/state';
import { Category, Nugget as NuggetType } from '@/types/stream';
import { usePage } from '@inertiajs/react';
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
    lgas: State[];
}

const StreamSaved = ({ releases, categories, lgas }: Props) => {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
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
        searchTerm,
    } = useFilterStore();

    const { nuggets, loadMore, hasMorePages, isLoadingMore, isLoading, refetch } = useSavedReleases({
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

    const handleNuggetUnsave = () => {
        refetch();
    };

    return (
        <Layout>
            {!searchTerm && (
                <div className="off-center-container-no-padding">
                    <Search
                        isAllowed={user?.subscribed || false}
                        selectedLGAs={selectedLGAs}
                        setSelectedLGAs={setSelectedLGAs}
                        lgas={lgas}
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

            <main className="lg:off-center-container">
                <StreamHeader source={'releases.saved'} categories={categories} reload={() => setSearchTrigger(new Date())} />
                {!isLoading ? (
                    <div className="">
                        {nuggets.map((nugget, index) => (
                            <Nugget
                                action={handleNuggetUnsave}
                                nugget={nugget}
                                key={nugget?.id}
                                className={cn('border-b px-5 lg:px-10', index === 0 && 'border-t')}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-96 items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                )}
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

export default StreamSaved;
