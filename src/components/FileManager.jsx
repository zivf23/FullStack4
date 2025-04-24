import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { listFiles, saveFile, loadFile } from "../storage";

export default function FileManager({ text, setText, filename, setFilename }) {
  const { user, logout } = useAuth();
  const [showList, setShowList] = useState(false);

  const handleSave = () => {
    const name = filename || prompt("Enter file name:", filename || "untitled.txt");
    if (name) { saveFile(user, name, text); setFilename(name); }
  };

  const handleSaveAs = () => {
    const name = prompt("Save as:", "untitled.txt");
    if (name) { saveFile(user, name, text); setFilename(name); }
  };

  const handleOpen = (name) => {
    setText(loadFile(user, name));
    setFilename(name);
    setShowList(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <button className="btn" onClick={handleSave}>💾 Save</button>
      <button className="btn" onClick={handleSaveAs}>📁 Save As</button>
      <button className="btn" onClick={() => setShowList(v => !v)}>📂 Open…</button>
      <span className="ml-auto italic text-sm">{filename || "Unnamed"}</span>
      <button className="btn bg-red-600" onClick={logout}>Logout</button>

      {showList && (
        <div className="modal-overlay" onClick={() => setShowList(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-2">Your Files</h2>
            <ul className="max-h-60 overflow-auto">
              {listFiles(user).map(name => (
                <li key={name} className="hover-bg-gray-100 p-1 cursor-pointer"
                    onClick={() => handleOpen(name)}>{name}</li>
              ))}
              {listFiles(user).length === 0 && (
                <li className="text-gray-500">No files yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
