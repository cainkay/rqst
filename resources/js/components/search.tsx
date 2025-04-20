import CalendarIcon from '@/components/icons/calendar-icon';
import FolderIcon from '@/components/icons/folder-icon';
import PinIcon from '@/components/icons/pin-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Category } from '@/types/stream';
import { useState } from 'react';
interface Props {
    categories: Category[];
    selectedCategories: number[];
    onCategorySelect?: (categoryId: number) => void;
}
const Search = ({ categories, selectedCategories, onCategorySelect }: Props) => {
    const [activeView, setActiveView] = useState<'category' | 'date' | 'location'>('category');

    const handleViewChange = (view: 'category' | 'date' | 'location') => {
        setActiveView(view);
    };

    return (
        <div>
            <section className="flex border-x border-b">
                <Button
                    onClick={() => handleViewChange('category')}
                    variant="ghost"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'category' && 'text-background bg-black')}
                >
                    <FolderIcon className="size-6" />
                    <span className='hidden md:inline'>CATEGORIES</span>
                </Button>
                <Button
                    onClick={() => handleViewChange('date')}
                    variant="ghost"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'date' && 'text-background bg-black')}
                >
                    <CalendarIcon className="size-6" />
                    <span className='hidden md:inline'>DATES</span>
                </Button>
                <Button
                    onClick={() => handleViewChange('location')}
                    variant="ghost"
                    className={cn('gap-3 rounded-none border-r px-10! py-8 text-2xl', activeView === 'location' && 'text-background bg-black')}
                >
                    <PinIcon className="size-6" />
                    <span className='hidden md:inline'>LOCATIONS</span>
                </Button>
            </section>
            {activeView && (
                <section className=' bg-black px-10 py-5 '>
                    {activeView === 'category' && (
                        <div className="flex gap-4 flex-wrap">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => onCategorySelect && onCategorySelect(category.id)}
                                    variant="secondary"
                                    className={cn("gap-3 rounded-full text-left text-2xl bg-white", selectedCategories.includes(category.id) && 'bg-background')}
                                >
                                    <FolderIcon className={cn('size-6', selectedCategories.includes(category.id) && 'fill-black')} />
                                    {category.title}
                                </Button>
                            ))}
                        </div>
                    )}
                    {activeView === 'date' && <div className="px-10 py-5">Date View</div>}
                    {activeView === 'location' && <div className="px-10 py-5">Location View</div>}
                </section>
            )}
        </div>
    );
};

export default Search;
