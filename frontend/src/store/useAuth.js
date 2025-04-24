import { create } from 'zustand';
import {persist} from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,

            login: (UserData) => set({
                isAuthenticated: true,
                user: UserData,
            }),

            logout: () => {set({
                isAuthenticated: false,
                user: null,
            })
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage'
        }
    )
)