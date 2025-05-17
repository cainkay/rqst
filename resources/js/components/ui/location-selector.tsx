import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandGroup, CommandInput } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AU_STATE } from '@/lib/constants';
import { State } from '@/types/state';
import { CommandItem } from 'cmdk';
import { ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';

// Define interface for LGA with state context
interface LocationSelectorProps {
  selectedStates: string[];
  selectedLGAs: string[];
  lgas: State[];
  setSelectedStates: (states: string[]) => void;
  setSelectedLGAs: (lgas: string[]) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedStates,
  selectedLGAs,
  lgas,
  setSelectedStates,
  setSelectedLGAs,
}) => {
  const [statesOpen, setStatesOpen] = useState(false);
  const [lgasOpen, setLGAsOpen] = useState(false);
  const [lgaSearchValue, setLgaSearchValue] = useState('');

  // Toggle individual state selection
  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      setSelectedStates(selectedStates.filter(s => s !== state));
    } else {
      setSelectedStates([...selectedStates, state]);
    }
  };

  // Toggle individual LGA selection
  const toggleLGA = (lga: string) => {
    if (selectedLGAs.includes(lga)) {
      setSelectedLGAs(selectedLGAs.filter(l => l !== lga));
    } else {
      setSelectedLGAs([...selectedLGAs, lga]);
    }
  };

  // State selection display value
  const statesDisplayValue = () => {
    if (selectedStates.length === 0) return "All states";
    if (selectedStates.length === AU_STATE.length) return "All states";
    return `${selectedStates.length} state${selectedStates.length > 1 ? 's' : ''} selected`;
  };

  // LGA selection display value
  const lgasDisplayValue = () => {
    if (selectedLGAs.length === 0) return "All LGAs";
    return `${selectedLGAs.length} LGA${selectedLGAs.length > 1 ? 's' : ''} selected`;
  };

  return (
    <div className="flex flex-col gap-4 px-6 py-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* States Dropdown */}
        <div>
          <Popover open={statesOpen} onOpenChange={setStatesOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={statesOpen}
                className="w-full justify-between bg-[#0a0e17] border-[#464c58] text-white py-5"
              >
                {statesDisplayValue()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-[#0a0e17] border-[#464c58] text-white">
              <Command className="bg-transparent">
                <CommandInput placeholder="Multi-select" className="border-none focus:ring-0" />
                <ScrollArea className="h-60">
                  <CommandGroup className="px-3 py-2 text-white">
                    {AU_STATE.map((state) => (
                      <div key={state} className="flex items-center space-x-2 py-1.5">
                        <Checkbox
                          checked={selectedStates.includes(state)}
                          id={`state-${state}`}
                          onCheckedChange={() => toggleState(state)}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`state-${state}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {state}
                        </label>
                      </div>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* LGAs Dropdown */}
        <div>
          <Popover open={lgasOpen} onOpenChange={setLGAsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={lgasOpen}
                className="w-full justify-between bg-[#0a0e17] border-[#464c58] text-white py-5"
              >
                {lgasDisplayValue()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-[#0a0e17] border-[#464c58] text-white">
              <Command className="bg-transparent">
                <div className="flex items-center border-b border-[#464c58] px-3">
                  <Input
                    placeholder="Search & multi-select"
                    value={lgaSearchValue}
                    onChange={(e) => setLgaSearchValue(e.currentTarget.value)}
                    className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                  />
                </div>
                <ScrollArea className="h-60 ">
                  <CommandGroup className="px-3 py-2">
                    {lgas?.map((item) => (
                      <CommandItem key={`${item.id}`} className="flex items-center space-x-2 py-1.5">
                        <Checkbox
                          checked={selectedLGAs.includes(item.name)}
                          id={`lga-${item.id}`}
                          onCheckedChange={() => toggleLGA(item.name)}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`lga-${item.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white"
                        >
                          {item.name}
                        </label>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;