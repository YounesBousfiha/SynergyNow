import { create } from 'zustand';


export const useDealsStore = create((set) => ({
    deals: [],

    setDeals: (deals) => set({ deals }),
    addDeal: (deal) =>
        set((state) => ({
            deals: [...state.deals, deal]
        })),

    removeDeal: (id) =>
        set((state) => ({
            deals: state.deals.filter((deal) => deal.id !== id)
        })),
    updateDeal: (id, updatedData) =>
        set((state) => ({
            deals: state.deals.map((deal) =>
                deal.id === id ? {...deal, ...updatedData} : deal
            )
        })),
}));