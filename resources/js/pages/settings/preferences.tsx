import FolderIcon from '@/components/icons/folder-icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { State } from '@/types/state';
import { Category } from '@/types/stream';
import { useForm } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    states: number[];
    app_states: State[];
    lgas: number[];
    app_lgas: State[];
    categories: number[];
    app_categories: Category[];
}

const UserPreferences: React.FC<Props> = ({ states, app_states, lgas, app_lgas, categories, app_categories }) => {
    const { data, setData, patch, processing } = useForm({
        states: states,
        lgas: lgas,
        categories: categories,
    });

    const [statesOpen, setStatesOpen] = useState(false);
    const [lgaOpen, setLgaOpen] = useState(false);

    // Generic display value function for dropdowns
    const displayValue = (type: 'state' | 'lga') => {
        const items = type === 'state' ? { selected: data.states, all: app_states } : { selected: data.lgas, all: app_lgas };

        if (items.selected.length === 0 || items.selected.length === items.all.length) {
            return `All ${type === 'state' ? 'states' : 'LGAs'}`;
        }

        return `${items.selected.length} ${type}${items.selected.length > 1 ? 's' : ''} selected`;
    };

    // Generic selection handler for states and LGAs
    const handleSelect = (id: number, type: 'state' | 'lga') => {
        const field = type === 'state' ? 'states' : 'lgas';
        const currentSelection = data[field] as number[];

        if (currentSelection.includes(id)) {
            setData(
                field,
                currentSelection.filter((selectedId: number) => selectedId !== id),
            );
        } else {
            setData(field, [...currentSelection, id]);
        }
    };

    // Add the missing category selection handler
    const handleCategorySelect = (categoryId: number) => {
        if (data.categories.includes(categoryId)) {
            setData(
                'categories',
                data.categories.filter((id: number) => id !== categoryId),
            );
        } else {
            setData('categories', [...data.categories, categoryId]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('preference.patch'), {
            preserveScroll: true,
        });
    };

    return (
        <div className="space-y-8">
            {/* Categories Section */}
            <section className="text-background mt-6 space-y-6">
                <h3 className="text-2xl font-bold uppercase">Email Notification Preferences</h3>
                {/* <div className='flex items-center space-x-2 '>
                    <Checkbox
                        id={`notifications`}
                        onCheckedChange={() => setData('notifications', !data.notifications)}
                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                    />
                    <label
                        htmlFor={`notifications`}
                        className="cursor-pointer  leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        
                        <span className="">Receive email notifications</span>
                    </label>
                </div> */}
                <p>Select the categories you'd like to receive email notifications about.</p>

                <form onSubmit={submit} className="space-y-8">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-4">
                        <Button
                            onClick={() => setData('categories', [])}
                            variant="secondary"
                            type="button"
                            className={cn(
                                'gap-3 rounded-full text-left uppercase',
                                data.categories.length === 0 ? 'bg-bright-blue text-background' : 'bg-white text-black',
                            )}
                        >
                            <FolderIcon className="size-6" />
                            All categories
                        </Button>

                        {app_categories.map((category) => (
                            <Button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                variant="secondary"
                                type="button"
                                className={cn(
                                    'gap-3 rounded-full bg-white text-left uppercase',
                                    data.categories.includes(category.id) && 'bg-bright-blue text-background',
                                )}
                            >
                                <FolderIcon className={cn('size-6', data.categories.includes(category.id) && 'fill-background')} />
                                {category.title}
                            </Button>
                        ))}
                    </div>

                    {/* States Dropdown */}
                    <div className="space-y-4">
                        <Popover open={statesOpen} onOpenChange={setStatesOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={statesOpen}
                                    className="w-full max-w-[300px] justify-between border-[#464c58] bg-[#0a0e17] py-5 text-white"
                                >
                                    {displayValue('state')}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full border-[#464c58] bg-[#0a0e17] p-0 text-white">
                                <Command className="bg-transparent">
                                    <ScrollArea className="h-60">
                                        <CommandGroup className="px-3 py-2 text-white">
                                            {app_states.map((state) => (
                                                <CommandItem key={state.id} className="flex items-center space-x-2 py-1.5">
                                                    <Checkbox
                                                        checked={data.states.includes(state.id)}
                                                        id={`state-${state.id}`}
                                                        onCheckedChange={() => handleSelect(state.id, 'state')}
                                                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                                                    />
                                                    <label
                                                        htmlFor={`state-${state.id}`}
                                                        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {state.abbr}
                                                    </label>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* LGAs Dropdown */}
                    <div className="space-y-4">
                        <Popover open={lgaOpen} onOpenChange={setLgaOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={lgaOpen}
                                    className="w-full max-w-[300px] justify-between border-[#464c58] bg-[#0a0e17] py-5 text-white"
                                >
                                    {displayValue('lga')}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full border-[#464c58] bg-[#0a0e17] p-0 text-white">
                                <Command className="bg-transparent">
                                    <CommandInput placeholder="Search LGAs..." className="text-background border-none focus:ring-0" />
                                    <ScrollArea className="h-60">
                                        <CommandGroup className="px-3 py-2 text-white">
                                            {app_lgas.map((lga) => (
                                                <CommandItem className="flex items-center space-x-2 py-1.5" key={lga.id}>
                                                    <Checkbox
                                                        checked={data.lgas.includes(lga.id)}
                                                        id={`lga-${lga.id}`}
                                                        onCheckedChange={() => handleSelect(lga.id, 'lga')}
                                                        className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                                                    />
                                                    <label
                                                        htmlFor={`lga-${lga.id}`}
                                                        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {lga.name}
                                                    </label>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit"  className=" rounded-full uppercase" disabled={processing}>
                        Save Preferences
                    </Button>
                </form>
            </section>
        </div>
    );
};

export default UserPreferences;
