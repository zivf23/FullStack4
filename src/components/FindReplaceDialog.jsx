import React, { useState } from "react";

export default function FindReplaceDialog({ open, onClose,
                                            text, setText, pushHistory }) {
  if (!open) return null;

  const [searchFor, setSearchFor]   = useState("");
  const [replaceBy, setReplaceBy]   = useState("");

  const handleReplaceAll = () => {
    const next = text.replaceAll(searchFor, replaceBy);
    setText(next);
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h2 className="font-bold text-lg mb-2">Find &amp; Replace</h2>
        <input className="input mb-2 w-full"
               placeholder="Find"  value={searchFor}
               onChange={e => setSearchFor(e.target.value)} />
        <input className="input mb-4 w-full"
               placeholder="Replace" value={replaceBy}
               onChange={e => setReplaceBy(e.target.value)} />
        <div className="flex gap-2 justify-end">
          <button className="btn" onClick={handleReplaceAll}>Replace All</button>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
