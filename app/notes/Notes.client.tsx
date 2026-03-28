"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import styles from "../../styles/NotesPage.module.css";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, search),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
    return <p>Error loading notes: {error.message}</p>;
  }

  const totalPages = data?.totalPages || 1;

  return (
    <>
      <h1>Notes</h1>

      <div className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <NoteForm />
      </div>

      <NoteList notes={data?.notes || []} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}