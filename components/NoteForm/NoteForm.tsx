'use client';

import css from './NoteForm.module.css';
import {useRouter} from 'next/navigation';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createNote} from '@/lib/api';
import {useNoteStore} from '@/lib/store/noteStore';

export default function NoteForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {draft, setDraft, clearDraft} = useNoteStore();

    const {mutateAsync, isPending} = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
            clearDraft();
            router.back();
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutateAsync(draft);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setDraft({[name]: value});
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    minLength={3}
                    maxLength={50}
                    className={css.input}
                    value={draft.title}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    maxLength={500}
                    className={css.textarea}
                    value={draft.content}
                    onChange={handleChange}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    value={draft.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                    Cancel
                </button>
                <button type="submit" className={css.submitButton} disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create note'}
                </button>
            </div>
        </form>
    );
}
