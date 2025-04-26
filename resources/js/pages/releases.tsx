import Nugget from '@/components/nugget';
import Search from '@/components/search';
import { useReleases } from '@/hooks/use-releases';
import Layout from '@/layouts/layout';
import { useFilterStore } from '@/store/filter';
import { Category, Nugget as NuggetType } from '@/types/stream';
import dayjs from 'dayjs';
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
        searchTerm
    } = useFilterStore();

    const {
        nuggets,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        refetch,
    } = useReleases({
        initialData: releases,
        categories: selectedCategories,
        lgas: selectedLGAs,
        states: selectedStates,
        search: searchTerm,
        date: date,
        trigger: searchTrigger
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
            <main className="off-center-container">
                {nuggets.map((nugget) => (
                    <Nugget
                        id={nugget.id}
                        is_saved={nugget.is_saved}
                        key={nugget.id}
                        description={nugget.description}
                        date={dayjs(nugget.date).format('DD/MM/YYYY')}
                        location={nugget.state}
                        url={nugget.url}
                    />
                ))}
            </main>
        </Layout>
    );
};

export default ReleasePage;
