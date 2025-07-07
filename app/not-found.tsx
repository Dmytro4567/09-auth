import css from './not-found.module.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'NoteHub – Page Not Found',
    description: 'Unfortunately, the page was not found. Please check the URL or return to the NoteHub homepage.',
    openGraph: {
        title: 'Page Not Found – NoteHub',
        description: 'This page does not exist. Try a different path or go to the homepage.',
        url: 'https://08-zustand-ten.vercel.app/not-found',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub – Page Not Found',
            },
        ],
    },
};


export default function NotFound() {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </>
    );
}