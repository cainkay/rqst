import { create } from 'zustand';

interface BearState {
    showPaywall: boolean;
    displayPaywall: (show: boolean) => void;
}

export const useGlobalStore = create<BearState>()((set) => ({
    showPaywall: false,
    displayPaywall: (show) => set(() => ({ showPaywall: show })),
}));
