"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";
import css from "@/styles/NotesPage.module.css";
import listCss from "@/styles/NoteList.module.css";

export default function NotesClient() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(1, ""),
  });

  if (isLoading) return <p>Loading...</p>;

  if (error instanceof Error) {
    return <p>Error loading notes: {error.message}</p>;
  }

  if (!data?.notes.length) {
    return <p>No notes found</p>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Notes</h1>

      <ul className={listCss.list}>
        {data.notes.map((note) => (
          <li key={note.id} className={listCss.listItem}>
            <Link href={`/notes/${note.id}`} className={listCss.link}>
              <h3 className={listCss.title}>{note.title}</h3>
              <p className={listCss.content}>{note.content}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}