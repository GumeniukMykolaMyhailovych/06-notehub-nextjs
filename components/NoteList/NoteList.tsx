"use client";

import Link from "next/link";
import css from "./NoteList.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
};

type Props = {
  notes: Note[];
};

export default function NoteList({ notes }: Props) {
  if (!notes.length) {
    return <p>No notes found</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          
          <h3 className={css.title}>{note.title}</h3>
          
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View
            </Link>
          </div>

        </li>
      ))}
    </ul>
  );
}