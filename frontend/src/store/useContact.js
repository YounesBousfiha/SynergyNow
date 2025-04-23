import { create } from 'zustand';

export const useContactStore = create((set) => ({
    contacts: [],

    setContacts: (contacts) => set({ contacts }),

    addContact: (contact) =>
        set((state) => ({
            contacts: [...state.contacts, contact]
        })),

    removeContact: (id) =>
        set((state) => ({
            contacts: state.contacts.filter((contact) => contact.id !== id)
        })),

    updateContact: (id, updatedData) =>
        set((state) => ({
            contacts: state.contacts.map((contact) =>
                contact.id === id ? { ...contact, ...updatedData } : contact
            )
        })),
}));