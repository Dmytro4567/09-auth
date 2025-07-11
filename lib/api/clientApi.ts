import { api } from './api';
import type { Note, CreateNote } from '@/types/note';
import type { User } from '@/types/user';

export const fetchNotes = async (params: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string | null;
}): Promise<{ notes: Note[]; totalPages: number }> => {
    const { data } = await api.get('/notes', { params });
    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await api.get(`/notes/${id}`);
    return data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
    const { data } = await api.post('/notes', note);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await api.delete(`/notes/${id}`);
    return data;
};

// auth
export const registerUser = async (email: string, password: string): Promise<User> => {
    const { data } = await api.post('/auth/register', { email, password });
    return data;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
};

export const logoutUser = async (): Promise<void> => {
    await api.post('/auth/logout');
};
