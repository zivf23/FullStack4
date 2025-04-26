import React, { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import FileManager from "./components/FileManager";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./index.css";
import "./App.css";
import "./components/Cursor";
import Cursor from "./components/Cursor";

function Shell() {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [filename, setFilename] = useState(null);
  if (!user) return <Login />;
  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">
      <Preview text={text} />
      <div className="flex-grow flex flex-col gap-2">
        <Editor value={text} onChange={setText} />
        <FileManager
          text={text}
          setText={setText}
          filename={filename}
          setFilename={setFilename}
        />
      </div>
    </div>
  );
}


/* export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
} */



export default function App() {
  // The text
  const [textContent, setTextContent] = useState([]);


  // The cursor
  const [cursor, setCursor] = useState({
    position: 0,
    style: {font: "Ariel", size: "20px", color: "black", bold: false, italic: false}
  });


  // Case of selecting
  const [selection,setSelection] = useState({
    actice: false,
    startPosition: null,
    endPosition: null,
  });

  // returning the text eith the cursor in the rigth place
  const getTextWithCursor = useCallback(() => {
    if (textContent.length === 0) {
      return [{ char: "|", ...cursor.style }];
    }
    
    return [
      ...textContent.slice(0,cursor.position),
      { char:"|", ...cursor.style },
      ...textContent.slice(cursor.position)
    ];
  }, [textContent, cursor]);

  // turning on and off "style mod"
  const toggleStyle = useCallback((styleProperty) => {
    setCursor(current => ({
      ...current,
      style: {
        ...current.style,
        [styleProperty]: !current.style[styleProperty]
      }
    }));
  }, []);

  // inserting a new character
  const insertCharacter = useCallback((char) => {
    const newChar = { char, ...cursor.style };

    // case of selecting-on
    if (selection.actice && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);

      setTextContent(current => [
        ...current.slice(0, start),
        newChar,
        ...current.slice(end)
      ]);

      setCursor (current => ({
        ...current,
        position: start + 1
      }));
      
      setSelection({
        actice: false,
        startPosition: null,
        endPosition: null
      });
    }
    // selecting is off -> add one char only at the right place
    else {
      setTextContent(current => [
        ...current.slice(0,cursor.position),
        newChar,
        ...current.slice(cursor.position)
      ]);

      setCursor(current => ({
        ...current,
        position: current.position + 1
      }));
    }
  }, [cursor, selection]);

  // case of deleting a char
  const deleteCharacter = useCallback(() => {

    // is the selection is on, delete everything
    if (selection.actice && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);

      setTextContent(current => [
        ...current.slice(0, start),
        ...current.slice(end)
      ]);

      setCursor (current => ({
        ...current,
        position: start
      }));
      
      setSelection({
        actice: false,
        startPosition: null,
        endPosition: null
      });
    }

    // case of no selecting, delete only one character
    else if (cursor.position > 0) {
      setTextContent(current => [
        ...current.slice(0, cursor.position - 1),
        ...current.slice(cursor.position)
      ]);

      setCursor (current => ({
        ...current,
        position: cursor.position - 1
      }));
      // case of no selection and cursor.position is 0, do noting
    }
  }, [cursor, selection]);

  // case of moving the cursor
  const moveCursorPosition = useCallback((direction) => {
    const delta = direction === "left" ? -1 : 1;
    const newPosition = Math.max(0, Math.min(cursor.position + delta, textContent.length));

    // yet again we need to take in conclusion the case of selection on
    if (selection.actice) {
      if (selection.startPosition === null) {
        setSelection({
          actice: true,
          startPosition: cursor.position,
          endPosition: newPosition
        });
      }
      else {
        setSelection(current => ({
          ...current, 
          endPosition: newPosition
        }));
      }
    }
    else {
      setSelection({
        actice: false,
        startPosition: null,
        endPosition: null
      });
    }

    setCursor(current => ({
      ...current,
      position: newPosition
    }));

  }, [cursor, textContent, selection]);


  // turning on and off selection mod
  const toggleSelectionMOde = useCallback((isActive) => {
    setSelection(current => ({
      actice: isActive,
      startPosition: isActive ? cursor.position : null,
      endPosition: isActive ? cursor.position : null
    }));
  }, [cursor.position]);

  // change the default style 
  const changeDefaultStyle = useCallback ((property, value) => {
    setCursor(current => ({
      ...current,
      style: {
        ...current.style,
        [property]: value
      }
    }));
  }, []);

  return (
    <div className="app-part">

      <Editor styleTest={getTextWithCursor()}></Editor>
      <div className="keyboard">
        <Keyboard
          keyPressed = {insertCharacter} // for example, Need to finish the keyboard
          backPressd = {deleteCharacter}
          arrowPressed = {moveCursorPosition}
          selecting = {selection}
          setSelection = {setSelection}
        />
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import Editor from "./components/Editor";
// import Preview from "./components/Preview";
// import FileManager from "./components/FileManager";
// import Login from "./components/Login";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import "./index.css";

// function Shell() {
//   const { user } = useAuth();
//   // --- App‑level state ---
//   const [text, setText] = useState("");              // Active document content (Part A)
//   const [filename, setFilename] = useState(null);     // Active filename (Part B)

//   // future: const [docs, setDocs] = useState([]);    // <-- Part C placeholder

//   if (!user) return <Login />; // Part D – basic username login

//   return (
//     <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">
//       {/* Preview on top */}
//       <Preview text={text} />

//       {/* Editor & toolbar on bottom */}
//       <div className="flex-grow flex flex-col gap-2">
//         <Editor value={text} onChange={setText} />
//         <FileManager
//           text={text}
//           setText={setText}
//           filename={filename}
//           setFilename={setFilename}
//         />
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <Shell />
//     </AuthProvider>
//   );
// }
