'use client';

import {useEffect} from 'react';
import {useAuthStore} from '@/lib/store/authStore';
import {checkSession, getMe} from '@/lib/api/clientApi';

type Props = {
    children: React.ReactNode;
};

const AuthProvider = ({children}: Props) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const sessionOk = await checkSession();

                if (sessionOk) {
                    const user = await getMe();
                    if (user) {
                        setUser(user);
                    } else {
                        clearIsAuthenticated();
                    }
                } else {
                    clearIsAuthenticated();
                }
            } catch (error) {
                console.error('[AuthProvider] Failed to check session:', error);
                clearIsAuthenticated();
            }
        };

        initAuth();
    }, [setUser, clearIsAuthenticated]);

    return <>{children}</>;
};

export default AuthProvider;
