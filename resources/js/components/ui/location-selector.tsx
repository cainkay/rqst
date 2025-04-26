import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandGroup, CommandInput } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AU_STATE, LGA_BY_STATE } from '@/lib/constants';
import { ChevronsUpDown } from 'lucide-react';
import React, { useMemo, useState } from 'react';

// Define interface for LGA with state context
interface LgaWithContext {
  lga: string;
  state: string;
  isDuplicate: boolean;
}

interface LocationSelectorProps {
  selectedStates: string[];
  selectedLGAs: string[];
  setSelectedStates: (states: string[]) => void;
  setSelectedLGAs: (lgas: string[]) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedStates,
  selectedLGAs,
  setSelectedStates,
  setSelectedLGAs,
}) => {
  const [statesOpen, setStatesOpen] = useState(false);
  const [lgasOpen, setLGAsOpen] = useState(false);
  const [lgaSearchValue, setLgaSearchValue] = useState('');

  // Filter available LGAs based on selected states
  const filteredLGAs = useMemo(() => {
    return selectedStates.length > 0
      ? selectedStates.flatMap(state => {
          return state in LGA_BY_STATE ? LGA_BY_STATE[state as keyof typeof LGA_BY_STATE] : [];
        })
      : Object.values(LGA_BY_STATE).flat();
  }, [selectedStates]);

  // Create LGAs with context information to handle duplicates
  const lgasWithContext = useMemo(() => {
    // First, identify which LGAs appear in multiple states
    const lgaOccurrences: Record<string, string[]> = {};
    
    // Use all states for duplicate detection
    AU_STATE.forEach(state => {
      if (state in LGA_BY_STATE) {
        const stateLGAs = LGA_BY_STATE[state as keyof typeof LGA_BY_STATE];
        stateLGAs.forEach(lga => {
          if (!lgaOccurrences[lga]) {
            lgaOccurrences[lga] = [];
          }
          lgaOccurrences[lga].push(state);
        });
      }
    });
    
    // Now create the contextualized list based on filtered LGAs
    const result: LgaWithContext[] = [];
    
    // For each filtered LGA, find its state(s) 
    filteredLGAs.forEach(lga => {
      // Find which of the selected states (or all states if none selected) have this LGA
      const relevantStates = selectedStates.length > 0 
        ? selectedStates.filter(state => {
            const stateLGAs = LGA_BY_STATE[state as keyof typeof LGA_BY_STATE] || [];
            return stateLGAs.includes(lga);
          })
        : lgaOccurrences[lga];
      
      // For each state this LGA appears in, add an entry with duplicate status
      relevantStates.forEach(state => {
        result.push({
          lga,
          state,
          isDuplicate: lgaOccurrences[lga].length > 1
        });
      });
    });
    
    return result;
  }, [filteredLGAs, selectedStates]);

  // Filter by search term
  const searchedLGAsWithContext = useMemo(() => {
    return lgaSearchValue
      ? lgasWithContext.filter(item => 
          item.lga.toLowerCase().includes(lgaSearchValue.toLowerCase()))
      : lgasWithContext;
  }, [lgasWithContext, lgaSearchValue]);

  // Get unique LGAs (no duplicates) for counting purposes
  const uniqueFilteredLGAs = useMemo(() => {
    return [...new Set(filteredLGAs)];
  }, [filteredLGAs]);

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
    if (uniqueFilteredLGAs.length > 0 && selectedLGAs.length === uniqueFilteredLGAs.length) return "All LGAs";
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
                    onChange={(e) => setLgaSearchValue(e.target.value)}
                    className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                  />
                </div>
                <ScrollArea className="h-60 ">
                  <CommandGroup className="px-3 py-2">
               
                    {searchedLGAsWithContext.map((item) => (
                      <div key={`${item.state}-${item.lga}`} className="flex items-center space-x-2 py-1.5">
                        <Checkbox
                          checked={selectedLGAs.includes(item.lga)}
                          id={`lga-${item.state}-${item.lga}`}
                          onCheckedChange={() => toggleLGA(item.lga)}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`lga-${item.state}-${item.lga}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white"
                        >
                          {item.lga}
                          {item.isDuplicate && (
                            <span className="text-xs text-gray-400 ml-1">({item.state})</span>
                          )}
                        </label>
                      </div>
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