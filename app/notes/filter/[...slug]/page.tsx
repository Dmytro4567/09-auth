import {fetchNotes} from '@/lib/api';
import Notes from './Notes.client';
import {Metadata} from "next";

type FilterPageParams = { slug?: string[] };

export async function generateMetadata({params}: { params: Promise<FilterPageParams> }): Promise<Metadata> {
    const {slug} = await params;
    const tag = slug?.[0] || 'All';
    const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

    const title = `NoteHub – Filter: ${capitalizedTag}`;
    const description = `Viewing notes in the "${capitalizedTag}".`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://08-zustand-ten.vercel.app/notes/filter/${tag}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'NoteHub – Filtered Notes',
                },
            ],
        },
    };
}

export default async function FilteredNotesPage({params}: { params: Promise<FilterPageParams> }) {
    const {slug} = await params;
    const tag = slug?.[0] ?? null;

    const data = await fetchNotes('', 1, 12, tag);

    return <Notes tag={tag} initialData={data}/>;
}
