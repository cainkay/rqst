import { useFilterStore } from '@/store/filter';
import { Category } from '@/types/stream';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { XIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from './ui/button';

interface Props {
    categories?: Category[];
    reload?: () => void;
}

const StreamHeader: React.FC<Props> = ({ categories, reload }) => {
    const {
        clearFilters,
        searchTerm,
        selectedCategories,
        setSelectedCategories,
        selectedLGAs,
        selectedStates,
        dateRange,
        setDateRange,
        setSelectedLGAs,
        setSelectedStates,
    } = useFilterStore();

    // Helper function to handle reloading after filter changes
    const handleReload = () => {
        if (reload) reload();
    };

    const handleClear = (stay = false) => {
        clearFilters();
        if (!stay) {
            router.visit(route('home'));
        } else {
            handleReload();
        }
    };

    // Generic remove handler for array-based filters
    const handleFilterRemove = (
        value: number | string,
        currentValues: (number | string)[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setter: (values: any[]) => void
    ) => { 
        const updatedValues = [...currentValues];
        updatedValues.splice(updatedValues.indexOf(value), 1);
        setter(updatedValues);
        handleReload();
    };

    // Specific filter removal handlers
    const handleCategoryRemove = (categoryId: number) => 
        handleFilterRemove(categoryId, selectedCategories, setSelectedCategories);
        
    const handleStateRemove = (state: string) => 
        handleFilterRemove(state, selectedStates, setSelectedStates);
        
    const handleLGARemove = (lga: string) => 
        handleFilterRemove(lga, selectedLGAs, setSelectedLGAs);

    const handleDateRemove = () => {
        setDateRange(undefined);
        handleReload();
    };

    // Redirect to home if no filters active
    useEffect(() => {
        const hasNoFilters = !searchTerm && 
            selectedCategories.length === 0 && 
            selectedStates.length === 0 && 
            selectedLGAs.length === 0 &&
            dateRange === undefined;
            
        if (hasNoFilters) {
            router.visit(route('home'));
        }
    }, [searchTerm, selectedCategories, selectedStates, selectedLGAs,dateRange]);

    // Reusable filter button component
    const FilterButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <Button onClick={onClick} variant={'secondary'} className="rounded-full">
            <XIcon className="size-4" />
            {label}
        </Button>
    );

    return (
        <section className="w-full flex-1 pt-5 p-5 lg:p-10 ">
            <div className="mb-5 flex flex-wrap items-center gap-5">
                <p className="text-3xl">
                    {searchTerm 
                        ? "The following releases contain your search term:" 
                        : "The following release are filtered by:"}
                    {!searchTerm && <span className="font-bold">{searchTerm}</span>}
                </p>
                
                {/* Search term filter */}
                {searchTerm && (
                    <FilterButton 
                        label={searchTerm} 
                        onClick={() => handleClear()}
                    />
                )}
                
                {/* Category filters */}
                {selectedCategories.map(categoryId => {
                    const category = categories?.find(cat => cat.id === categoryId);
                    if (!category) return null;
                    return (
                        <FilterButton 
                            key={categoryId}
                            label={category.title} 
                            onClick={() => handleCategoryRemove(category.id)}
                        />
                    );
                })}
                
                {/* Date range filter */}
                {dateRange && (
                    <FilterButton 
                        label={`${dayjs(dateRange.from).format('DD/MM/YYYY')} - ${dayjs(dateRange.to).format('DD/MM/YYYY')}`}
                        onClick={handleDateRemove}
                    />
                )}
                
                {/* State filters */}
                {selectedStates.map(state => (
                    <FilterButton 
                        key={state}
                        label={state} 
                        onClick={() => handleStateRemove(state)}
                    />
                ))}
                
                {/* LGA filters */}
                {selectedLGAs.map(lga => (
                    <FilterButton 
                        key={lga}
                        label={lga} 
                        onClick={() => handleLGARemove(lga)}
                    />
                ))}
            </div>

            {/* Clear all filters button */}
            <FilterButton 
                label="Close" 
                onClick={() => handleClear()}
            />
        </section>
    );
};

export default StreamHeader;