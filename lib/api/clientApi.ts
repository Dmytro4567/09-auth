import { nextServer } from './api';
import type { Note, CreateNote } from '@/types/note';
import type { User } from '@/types/user';

interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

interface SearchParams {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

type UserName = {
    username: string;
};

export async function fetchNotes(
    search: string,
    page: number,
    tag?: string
): Promise<NotesResponse> {
    const perPage = 12;
    const params: SearchParams = { page, perPage };

    if (search) params.search = search;
    if (tag) params.tag = tag;

    const res = await nextServer.get<NotesResponse>('/notes', {
        params,
    });

    return res.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
    const { data } = await nextServer.post<Note>('/notes', note);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
};

export const checkSession = async (): Promise<boolean> => {
    try {
        const res = await nextServer.get<{ success: boolean }>('/auth/session');
        return res.data.success === true;
    } catch (err: unknown) {
        console.error('checkSession unexpected error', err);
        return false;
    }
};

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout');
};

export const editUser = async (userData: UserName): Promise<User> => {
    const { data } = await nextServer.patch<User>('/users/me', userData);
    return data;
};
