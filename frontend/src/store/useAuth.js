import { create } from 'zustand';
import {persist} from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            user: null,

            login: (UserData, token) => set({
                isAuthenticated: true,
                user: UserData,
            }),

            logout: () => {set({
                isAuthenticated: false,
                user: null,
            })
            }
        }),
        {
            name: 'auth-storage'
        }
    )
)