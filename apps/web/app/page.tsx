"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");

  return (
    <div className="relative w-full">
      {/* Placeholder text */}
      {content === "" && (
        <span className="absolute left-3 top-2 text-gray-400 pointer-events-none select-none">
          Enter your message here...
        </span>
      )}

      {/* Editable div */}
      <div
        contentEditable
        className="min-h-[40px] w-full px-3 py-2 border border-gray-300 rounded text-base text-black focus:outline-none"
        onInput={(e) => setContent(e.currentTarget.textContent || "")}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}
