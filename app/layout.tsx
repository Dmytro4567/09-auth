import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {Roboto} from 'next/font/google';
import type {Metadata} from 'next';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'NoteHub – Convenient note manager',
    description: 'NoteHub is an app for creating, saving, and filtering notes with support for tags, search, and modals.',
    openGraph: {
        title: 'NoteHub – Convenient note manager',
        description: 'Create, search, and view notes using the convenient NoteHub interface.',
        url: 'https://08-zustand-ten.vercel.app/',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub',
            },
        ],
    },
};
export default function RootLayout({
                                       children,
                                       modal,
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={roboto.variable}>
        <TanStackProvider>
            <Header/>
            {children}
            {modal}
            <Footer/>
        </TanStackProvider>
        </body>
        </html>
    );
}
