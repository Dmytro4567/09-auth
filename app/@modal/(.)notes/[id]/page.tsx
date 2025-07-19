import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {getServerNoteById} from '@/lib/api/serverApi';
import NotePreview from './NotePreview.client';
import type {Note} from '@/types/note';

export default async function ModalNotePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery<Note>({
        queryKey: ['note', id],
        queryFn: () => getServerNoteById(id),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <NotePreview id={id}/>
        </HydrationBoundary>
    );
}

