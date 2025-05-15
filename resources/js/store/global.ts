import { create } from 'zustand';

interface BearState {
    showPaywall: boolean;
    displayPaywall: (show: boolean) => void;
    showLoginMenu: boolean;
    setShowLoginMenu: (show: boolean) => void;
}

export const useGlobalStore = create<BearState>()((set) => ({
    showPaywall: false,
    displayPaywall: (show) => set(() => ({ showPaywall: show })),
    showLoginMenu: false,
    setShowLoginMenu: (show) => set(() => ({ showLoginMenu: show })),
}));
