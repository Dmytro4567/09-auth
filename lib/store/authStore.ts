import {User} from "@/types/user";
import {create} from "zustand";
import {getMe} from "@/lib/api/clientApi";

type AuthStore = {
    isAuthenticated: boolean;
    user: User | null;
    setUser: (user: User) => void;
    clearIsAuthenticated: () => void;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()(
    (set) => ({
        isAuthenticated: false,
        user: null,

        setUser: (user: User) => {
            set(() => ({user, isAuthenticated: true}));
        },

        clearIsAuthenticated: () => {
            set(() => ({user: null, isAuthenticated: false}));
        },

        checkAuth: async () => {
            try {
                const user = await getMe();
                set({user, isAuthenticated: true});
            } catch {
                set({user: null, isAuthenticated: false});
            }
        },
    })
);

