import { create } from 'zustand';

export const useCompanyStore = create((set) => ({
    clients: [],

    setClients: (clients) => set({ clients }),

    addClient: (client) =>
        set((state) => ({
            clients: [...state.clients, client]
        })),

    removeClient: (id) =>
        set((state) => ({
            clients: state.clients.filter((client) => client.id !== id)
        })),

    updateClient: (id, updatedData) =>
        set((state) => ({
            clients: state.clients.map((client) =>
                client.id === id ? { ...client, ...updatedData } : client
            )
        })),
}));