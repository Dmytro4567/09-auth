import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {fetchNoteById} from '@/lib/api/clientApi';
import {getServerNoteById} from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';
import type {Metadata} from 'next';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const {id} = await params;

    try {
        const note = await getServerNoteById(id);
        const title = `NoteHub – ${note.title}`;
        const description = note.content.slice(0, 100);

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: `https://08-zustand-ten.vercel.app/notes/${id}`,
                images: [
                    {
                        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'NoteHub – Note Details',
                    },
                ],
            },
        };
    } catch {
        return {
            title: 'Note not found',
            description: `Note with ID ${id} was not found.`,
            openGraph: {
                title: 'Note not found',
                description: `Note with ID ${id} was not found.`,
                url: `https://08-zustand-ten.vercel.app/notes/${id}`,
                images: [
                    {
                        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                        width: 1200,
                        height: 630,
                        alt: 'NoteHub – Not found',
                    },
                ],
            },
        };
    }
}

export default async function NoteDetailsPage({params}: PageProps) {
    const {id} = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    );
}
