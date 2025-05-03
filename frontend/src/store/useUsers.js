import { create } from 'zustand';

export const useUsersStore = create(
    (set) => ( {

        users: [],
        setUsers: (users) => set(() => ({
            users: users
                })),
        removeUsers: (id) => set((state) => ({
            users: state.users.filter((user) => user.id !== id)
        })),
    })
)