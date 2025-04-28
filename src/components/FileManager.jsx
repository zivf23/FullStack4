import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { listFiles, saveFile, loadFile, deleteFile } from "../storage";

export default function FileManager({ text, setText, filename, setFilename }) {
  /* fileMeta   = { name: "doc.txt", id: 123 } */
  const { user, logout } = useAuth();
  const [showList, setShowList] = useState(false);

  /* ——— New ——— */
  const handleNew = () => {
    if (text.length && !window.confirm("Discard current text?")) return;
    setText("");
    setFilename(null);
    setShowList(false);
  };

  /* ——— Save / Save As ——— */
  const handleSave = () => {
    const name = fileMeta.name || prompt("Enter file name: ", fileMeta || "untitled.txt");

    if (name) {
      saveFile(user, name, text);
      setFilename(name);
    }
  };

  const handleSaveAs = () => {
    const name = prompt("Save as: ", "untitled.txt");
    if (name) {
      saveFile(user, name, text);
      setFilename(name);
    }
  };

/*   const handleNew = () => {
    if (text && text.length > 0) {
      if (window.confirm("Create new document? Any unsaved changes will be lost.")) {
        setText("");
        setFilename(null);
      }
    } else {
      setText("");
      setFilename(null);
    }
  }; */

  /* ——— Open ——— */
  const handleOpen = (name) => {
    const fileContent = loadFile(user, name);
    setText(fileContent);
    setFilename(name);
    setShowList(false);
  };

  const handleDelete = (name, e) => {
    e.stopPropagation(); // Prevent opening the file
    
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteFile(user, name);
      
      // If the deleted file is the current file, clear the editor
      if (name === filename) {
        setText("");
        setFilename(null);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button className="btn" onClick={handleNew}>📝 New</button>
      <button className="btn" onClick={handleSave}>💾 Save</button>
      <button className="btn" onClick={handleSaveAs}>📁 Save As</button>
      <button className="btn" onClick={() => setShowList(v => !v)}>📂 Open…</button>
      <span className="ml-auto italic text-sm">
        {filename || "Unnamed"}
      </span>
      <button className="btn bg-red-600" onClick={logout}>Logout</button>

      {showList && (
        <div className="modal-overlay" onClick={() => setShowList(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-2">Your Files</h2>
            <ul className="max-h-60 overflow-auto">
              {listFiles(user).map(name => (
                <li key={name} className="hover-bg-gray-100 p-1 cursor-pointer flex jusify-between items-center">
                  <span onClick={() => handleOpen(name)} className="flex-grow">{name}</span>
                  <button
                    onClick={(e) => handleDelete(name, e)}
                    className="delete-btn text-red-600 hover:text-red-800"
                    title="Delete file"
                  >
                    {/* 🗑 */}X
                  </button>
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
