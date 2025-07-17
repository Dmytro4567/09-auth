'use client';

import { useEffect } from 'react';
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const isAuthenticated = await checkSession();
                if (isAuthenticated) {
                    const user = await getMe();
                    if (user) {
                        setUser(user);
                    } else {
                        clearIsAuthenticated();
                    }
                } else {
                    clearIsAuthenticated();
                }
            } catch (err) {
                console.error('Failed to fetch user session:', err);
                clearIsAuthenticated();
            }
        };

        fetchUser();
    }, [setUser, clearIsAuthenticated]);

    return <>{children}</>;
};

export default AuthProvider;
