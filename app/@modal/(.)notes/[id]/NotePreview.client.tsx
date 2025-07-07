'use client';

import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import type {Note} from '@/types/note';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface NotePreviewProps {
    id: string;
}

export default function NotePreview({id}: NotePreviewProps) {
    const router = useRouter();

    const {data, isLoading, isError} = useQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(Number(id)),
        refetchOnMount: false,
    });

    const handleClose = () => {
        router.back();
    };

    if (isLoading) return <p>Loading note...</p>;
    if (isError || !data) return <p>Note not found.</p>;

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data.title}</h2>
                        <span className={css.tag}>{data.tag}</span>
                    </div>
                    <div className={css.content}>{data.content}</div>
                    <div className={css.date}>
                        {new Date(data.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
