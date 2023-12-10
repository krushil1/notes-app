'use client'

import styles from "./manage-notes/Notes.module.css";
import React from "react";

async function getNotes() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/collections/notes/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
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
  
  const formattedDate = new Date(dateString).toLocaleString("en-US", options);
  
  return formattedDate;
}

function Note({ note }: { note: any }) {
  const { id, title, content, created } = note || {};

  return (
    <div className={styles.note}>
      <h2>{title}</h2>
      <h4>{content}</h4>
      <p>{formatDate(created)}</p>
    </div>
  );
}

export default function HomePage() {
  const [notes, setNotes] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchNotes = async () => {
      const notesData = await getNotes();
      setNotes(notesData);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
