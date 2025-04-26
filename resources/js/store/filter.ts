

import { DateRange } from 'react-day-picker';
import { create } from 'zustand';

interface FilterState {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedStates: string[];
    setSelectedStates: (states: string[]) => void;
    selectedLGAs: string[];
    setSelectedLGAs: (lgas: string[]) => void;
    selectedCategories: number[];
    setSelectedCategories: (categories: number[]) => void;
    dateRange?: DateRange;
    setDateRange: (dateRange?: DateRange) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    selectedStates: [],
    setSelectedStates: (states) => set({ selectedStates: states }),
    selectedLGAs: [],
    setSelectedLGAs: (lgas) => set({ selectedLGAs: lgas }),
    selectedCategories: [],
    setSelectedCategories: (categories) => set({ selectedCategories: categories }),
    dateRange: undefined,
    setDateRange: (dateRange) => set({ dateRange }),
    searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),
}));
