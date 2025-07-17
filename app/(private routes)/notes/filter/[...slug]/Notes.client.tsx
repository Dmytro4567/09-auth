'use client';

import {useState, useEffect} from 'react';
import css from './Notes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {fetchNotes} from '@/lib/api/clientApi';
import type {Note} from '@/types/note';
import {useDebounce} from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
    query: string;
    page: number;
    tag: string;
    initialData: {
        notes: Note[];
        totalPages: number;
    };
}

export default function NotesClient({query, page, tag, initialData}: NotesClientProps) {
    const [currentPage, setCurrentPage] = useState(page);
    const [searchQuery, setSearchQuery] = useState(query);
    const [debouncedSearch] = useDebounce(searchQuery, 300);

    const {
        data,
        isLoading,
        isError,
        isSuccess,
    } = useQuery<{ notes: Note[]; totalPages: number }>({
        queryKey: ['notes', debouncedSearch, currentPage, tag],
        queryFn: () => fetchNotes(debouncedSearch, currentPage, tag),
        placeholderData: keepPreviousData,
        initialData: debouncedSearch === query && currentPage === page ? initialData : undefined,
    });

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onChange={handleSearchChange}/>
                {isSuccess && data.totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        totalPages={data.totalPages}
                    />
                )}
                <Link href="/notes/action/create" className={css.button}>
                    Create note +
                </Link>
            </header>

            {isLoading && <p>Loading notes...</p>}
            {isError && <p>Error loading notes. Please try again later.</p>}

            {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes}/>}
        </div>
    );
}
