import css from './NoteList.module.css';
import type {Note} from '@/types/note';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteNote} from '@/lib/api/clientApi';
import {useState} from 'react';
import Link from "next/link";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {
    const queryClient = useQueryClient();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onMutate: (id: string) => setDeletingId(id),
        onSettled: () => setDeletingId(null),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['notes']});
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>
                    {deletingId === note.id.toString() ? (
                        <p>Deleting...</p>
                    ) : (
                        <>
                            <h2 className={css.title}>{note.title}</h2>
                            <p className={css.content}>{note.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{note.tag}</span>
                                <div>
                                    <Link href={`/notes/${note.id}`} className={css.link} scroll={false}>
                                        View details
                                    </Link>
                                    <button onClick={() => mutate(note.id.toString())}
                                            className={css.button}
                                            disabled={deletingId === note.id.toString()}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
