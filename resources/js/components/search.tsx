import CalendarIcon from '@/components/icons/calendar-icon';
import FolderIcon from '@/components/icons/folder-icon';
import PinIcon from '@/components/icons/pin-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/stream';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Calendar } from './ui/calendar';
import LocationSelector from './ui/location-selector';
import { useGlobalStore } from '@/store/global';
import { State } from '@/types/state';

interface Props {
    categories: Category[];
    lgas: State[]
    selectedCategories: number[];
    onCategorySelect?: (categoryId: number) => void;
    date?: DateRange;
    setDate?: (date: DateRange | undefined) => void;
    // Added props for location filtering
    selectedStates: string[];
    selectedLGAs: string[];
    setSelectedStates: (states: string[]) => void;
    setSelectedLGAs: (lgas: string[]) => void;
    onSearch?: () => void;
    isAllowed: boolean;
}

const Search = ({
    categories,
    selectedCategories,
    date,
    setDate,
    lgas,
    onCategorySelect,
    onSearch,
    isAllowed,
    selectedStates = [],
    selectedLGAs = [],
    setSelectedStates = () => {},
    setSelectedLGAs = () => {},
}: Props) => {
    console.log("🚀 ~ isAllowed:", isAllowed)
    const [activeView, setActiveView] = useState<'category' | 'date' | 'location' | ''>('');
    const {displayPaywall} = useGlobalStore();

    const handleViewChange = (view: 'category' | 'date' | 'location') => {
        if(!isAllowed) {
            displayPaywall(true)
            return;
        }
        if (activeView === view) {
            setActiveView('');
            return;
        }
        setActiveView(view);
    };

    return (
        <div>
            <section className="flex border-x border-b">
                <Button
                    onClick={() => handleViewChange('category')}
                    variant="dark"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'category' && 'text-background bg-black')}
                >
                    <FolderIcon className="size-6" />
                    <span className="hidden md:inline">CATEGORIES</span>
                </Button>
                <Button
                    onClick={() => handleViewChange('date')}
                    variant="dark"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'date' && 'text-background bg-black')}
                >
                    <CalendarIcon className="size-6" />
                    <span className="hidden md:inline">DATES</span>
                </Button>
                <Button
                    onClick={() => handleViewChange('location')}
                    variant="dark"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'location' && 'text-background bg-black')}
                >
                    <PinIcon className="size-6" />
                    <span className="hidden md:inline">LOCATIONS</span>
                </Button>
            </section>
            {activeView && (
                <section className="bg-black px-10 py-5">
                    {activeView === 'category' && (
                        <div className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => onCategorySelect && onCategorySelect(category.id)}
                                    variant="secondary"
                                    className={cn(
                                        'gap-3 rounded-full bg-white text-left text-2xl',
                                        selectedCategories.includes(category.id) && 'bg-background',
                                    )}
                                >
                                    <FolderIcon className={cn('size-6', selectedCategories.includes(category.id) && 'fill-black')} />
                                    {category.title}
                                </Button>
                            ))}

                            <Button onClick={onSearch}>Update</Button>
                        </div>
                    )}
                    {activeView === 'date' && (
                        <div className="text-background flex flex-col gap-4 lg:flex-row lg:px-10 lg:py-5">
                            <p className="max-w-2xs text-3xl">Select your start and end date on the calendar and update.</p>
                            <div className="flex flex-col lg:flex-row">
                                <Calendar
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    captionLayout="dropdown"
                                    numberOfMonths={1}
                                    className="border border-white p-5"
                                />

                                <section className="self-start border border-white px-10 py-5 text-white">
                                    <p className="text-lg whitespace-nowrap">
                                        From: {date?.from ? dayjs(date.from).format('DD|MM|YYYY') : '__|__|____'}{' '}
                                    </p>
                                    <p className="text-lg whitespace-nowrap">To: {date?.to ? dayjs(date.to).format('DD|MM|YYYY') : '__|__|____'} </p>
                                </section>
                            </div>
                            <Button onClick={onSearch}>Update</Button>
                        </div>
                    )}
                    {activeView === 'location' && (
                        <div>
                            <LocationSelector
                                selectedStates={selectedStates}
                                selectedLGAs={selectedLGAs}
                                lgas={lgas}
                                setSelectedStates={setSelectedStates}
                                setSelectedLGAs={setSelectedLGAs}
                            />
                            <Button onClick={onSearch}>Update</Button>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Search;
