import { create } from "zustand";


export const useQuoteStore = create((set) => ({
    quotes: [],
    setQuotes: (quotes) => set({ quotes }),
    removeQuote: (id) =>
        set((state) => ({
            quotes: state.quotes.filter((quote) => quote.id !== id)
        }))
}));