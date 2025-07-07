import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api';
import NotePreview from './NotePreview.client';

export default async function ModalNotePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', Number(id)],
        queryFn: () => fetchNoteById(Number(id)),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <NotePreview id={id}/>
        </HydrationBoundary>
    );
}

