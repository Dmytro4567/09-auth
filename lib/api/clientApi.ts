import {nextServer} from './api';
import type {Note, CreateNote} from '@/types/note';
import type {User} from '@/types/user';

export type RegisterRequest = {
    email: string;
    password: string;
};

export type RegisterResponse = {
    email?: string;
    password?: string;
    message?: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

type CheckSessionRequest = {
    success: boolean;
};

type UserName = {
    username: string;
};

export const fetchNotes = async (params: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string | null;
}): Promise<{ notes: Note[]; totalPages: number }> => {
    const {data} = await nextServer.get('/notes', {params});
    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const {data} = await nextServer.get(`/notes/${id}`);
    return data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
    const {data} = await nextServer.post('/notes', note);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const {data} = await nextServer.delete(`/notes/${id}`);
    return data;
};

// auth
export const register = async (data: RegisterRequest) => {
    const res = await nextServer.post<User>('/auth/register', data);
    return res.data;
};

export const login = async (data: LoginRequest) => {
    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
};

export const checkSession = async () => {
    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
    return res.data.success;
};

export const getMe = async () => {
    const {data} = await nextServer.get<User>('/auth/me');
    return data;
};


export const logout = async (): Promise<void> => {
    const {data} = await nextServer.post('/auth/logout');
    return data;
};

export const editUser = async (userData: UserName) => {
    const {data} = await nextServer.patch<User>('/users/me', userData);
    return data;
};
