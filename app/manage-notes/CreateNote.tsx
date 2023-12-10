"use client";

import { useState } from "react";

export default function CreateNote({ onNoteCreated }: { onNoteCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const create = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!title || !content) {
      return;
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/collections/notes/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      console.log("Form submitted");

      setContent("");
      setTitle("");

      onNoteCreated();

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={create}>
      <h3>Create a new Note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create note</button>
    </form>
  );
}
