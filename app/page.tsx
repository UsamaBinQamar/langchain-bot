"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");

  const processPdf = async () => {
    try {
      const res = await fetch("/api/process-pdf", {
        method: "POST",
      });
      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      console.error("Error processing PDF:", err);
    }
  };

  return (
    <main>
      <h1>PDF Processor</h1>
      <button
        onClick={processPdf}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Process PDF
      </button>
      {content && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl mb-2">Extracted Content:</h2>
          <p>{content}</p>
        </div>
      )}
    </main>
  );
}
