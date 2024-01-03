import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {}

const getState = (stateName) => {
    return typeof window !== 'undefined' && localStorage.getItem('bus-operator-user')
        ? JSON.parse(localStorage.getItem('bus-operator-user'))
        : initialState
}

export const useUserStore = create(
    persist(
        (set) => ({
            user: getState('bus-operator-user'),
            setUser: (user) => set(() => ({ user: user })),
            resetUser: () => set(() => ({ user: initialState }))
        }),
        {
            name: 'bus-operator-user', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
)