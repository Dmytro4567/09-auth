import { nextServer } from './api';
import type { User } from '@/types/user';

export const getSession = async (cookies: string): Promise<User | null> => {
    const { data } = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookies,
        },
    });
    return data || null;
};