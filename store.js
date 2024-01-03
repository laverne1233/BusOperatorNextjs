import { create } from "zustand";

const initialState = {}

export const useUserStore = create((set) => ({
    user: initialState,
    setUser: (user) => set((state) => ({ user: state.user }))
}))