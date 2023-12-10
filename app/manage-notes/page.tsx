'use client'

import React, { useState, useEffect } from "react";
import styles from "./Notes.module.css";
import CreateNote from "./CreateNote";
import { MdDelete } from "react-icons/md";

async function getNotes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/collections/notes/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

async function deleteNote(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collections/notes/records/${id}`, {
    method: "DELETE",
  });
}

function formatDate(dateString: string | number | Date) {
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleString("en-US");

  return formattedDate;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([]);

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    await getAndSetNotes(); 
  };

  const getAndSetNotes = async () => {
    const notesData = await getNotes();
    setNotes(notesData);
  };

  useEffect(() => {
    getAndSetNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} onDelete={() => handleDeleteNote(note.id)} />
        ))}
      </div>

      <CreateNote onNoteCreated={getAndSetNotes} />
    </div>
  );
}

interface NoteProps {
  note: {
    id: string;
    title: string;
    content: string;
    created: string;
  };
  onDelete: () => void;
}

function Note({ note, onDelete }: NoteProps) {
  const { id, title, content, created } = note || {};

  return (
    <div className={styles.note}>
      <h2>{title}</h2>
      <h4>{content}</h4>
      <p>{formatDate(created)}</p>
      <div className={styles.delete} onClick={onDelete}><MdDelete /></div>
    </div>
  );
}
