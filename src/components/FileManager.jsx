import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { listFiles, saveFile, loadFile } from "../storage";

export default function FileManager({ text, setText, fileMeta, setFileMeta }) {
  /* fileMeta   = { name: "doc.txt", id: 123 } */
  const { user, logout } = useAuth();
  const [showList, setShowList] = useState(false);

  /* ——— New ——— */
  const handleNew = () => {
    if (text.length && !window.confirm("Discard current text?")) return;
    setText("");
    setFileMeta({ name: null, id: null });
    setShowList(false);
  };

  /* ——— Save / Save As ——— */
  const doSave = (name) => {
    if (!name) return;
    saveFile(user, name, text);
    setFileMeta({ name, id: Date.now() });
  };

  const handleSave = () => {
    if (fileMeta.name) return doSave(fileMeta.name);
    const n = window.prompt("Enter file name:", "untitled.txt");
    doSave(n);
  };

  const handleSaveAs = () => {
    const n = window.prompt("Save as:", fileMeta.name || "untitled.txt");
    doSave(n);
    setShowList(false);
  };

  /* ——— Open ——— */
  const handleOpen = (name) => {
    const content = loadFile(user, name);
    setText(content);
    setFileMeta({ name, id: Date.now() });
    setShowList(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <button className="btn" onClick={handleNew}>📝 New</button>
      <button className="btn" onClick={handleSave}>💾 Save</button>
      <button className="btn" onClick={handleSaveAs}>📁 Save As</button>
      <button className="btn" onClick={() => setShowList(v => !v)}>📂 Open…</button>
      <span className="ml-auto italic text-sm">
        {fileMeta.name || "Unnamed"}
      </span>
      <button className="btn bg-red-600" onClick={logout}>Logout</button>

      {showList && (
        <div className="modal-overlay" onClick={() => setShowList(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-2">Your Files</h2>
            <ul className="max-h-60 overflow-auto">
              {listFiles(user).map(name => (
                <li key={name}
                    className="hover-bg-gray-100 p-1 cursor-pointer"
                    onClick={() => handleOpen(name)}>
                  {name}
                </li>
              ))}
              {listFiles(user).length === 0 &&
                <li className="text-gray-500">No files yet</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
