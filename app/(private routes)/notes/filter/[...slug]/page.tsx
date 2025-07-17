import {fetchNotes} from '@/lib/api/clientApi';
import {QueryClient, HydrationBoundary, dehydrate} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import {Note} from '@/types/note';
import {Metadata} from 'next';

type NotesProps = {
    params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({params}: NotesProps): Promise<Metadata> {
    const {slug} = await params;
    const tag = slug?.[0] ?? 'all';

    return {
        title: tag === 'all' ? 'All notes' : tag,
        description: `This page contains notes from the category ${tag === 'all' ? 'All notes' : tag}`,
        openGraph: {
            title: tag === 'all' ? 'All notes' : tag,
            description: `This page contains notes from the category ${tag === 'all' ? 'All notes' : tag}`,
            url: `https://08-zustand-your-project.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Notes',
                },
            ],
        },
    };
}

export default async function Notes({params}: NotesProps) {
    const {slug} = await params;

    const queryClient = new QueryClient();
    const initialQuery = '';
    const initialPage = 1;
    const tag = slug?.[0] === 'all' ? '' : slug?.[0] || '';

    await queryClient.prefetchQuery({
        queryKey: ['notes', initialQuery, initialPage, tag],
        queryFn: () => fetchNotes(initialQuery, initialPage, tag),
    });

    const initialData = queryClient.getQueryData(['notes', initialQuery, initialPage, tag]) as {
        notes: Note[];
        totalPages: number;
    };

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient
                query={initialQuery}
                page={initialPage}
                initialData={initialData}
                tag={tag || 'all'}
            />
        </HydrationBoundary>
    );
}

export const dynamic = 'force-dynamic';
