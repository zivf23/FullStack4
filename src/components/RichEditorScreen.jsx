import React, { useCallback, useState, useEffect  } from "react";
import Preview from "./Preview";
import useHistory from "../hooks/useHistory";
import FileManager from "./FileManager";
import Keyboard from "./Keyboard";
import FindReplaceDialog from "./FindReplaceDialog";

import Editor from "./Editor";
import StyleBar from "./StyleBar";



/* ───────── קומפוננטה ───────── */
export default function RichEditorScreen() {

  /* 1️⃣  Tabs */
/*   const [docs, setDocs] = useState([
    { id: 1, title: "Untitled 1", content: [] }
  ]);
  const [activeId, setActiveId] = useState(1);
  const activeDoc   = docs.find(d => d.id === activeId) || docs[0];
  const textContent = Array.isArray(activeDoc.content) ? activeDoc.content : []; */
  // 
  
  const {
    value: textContent,
    set:   setTextContent,   // כמו useState-set אך שומר בהיסטוריה
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory([]);        // [] = מצב התחלתי ריק
  

  /* 2️⃣  File-name לטובת FileManager */
  const [filename, setFilename] = useState(null);

  const [showFind, setShowFind] = useState(false);

const plainText = Array.isArray(textContent) ? textContent.map(c => c.char).join("") : "";

  /* 3️⃣  Cursor + Selection */
  const [cursor, setCursor] = useState({
    position: 0,
    style: { font: "Arial", 
      size: "20px", 
      color: "black",
      bold: false, 
      italic: false, 
      underline: false 
    }
  });

  const [selection, setSelection] = useState({
    active:false, startPosition:null, endPosition:null
  });

  /* — helper: שמירה בטאב הפעיל — */
  // const setTextContent = (arr) =>
  //   setDocs(ds => ds.map(d =>
  //     d.id === activeId ? { ...d, content: arr } : d
  //   ));

  /* — helper: array + cursor — */
  const getTextWithCursor = useCallback(() => {
    // If selection is active, highlight selected text
    if (selection.active && selection.startPosition !== null && selection.endPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);
      
      const result = [];
      
      // The text before
      if (start > 0) {
        result.push(...textContent.slice(0, start));
      }
      
      // Selected text with highlight
      for (let i = start; i < end; i++) {
        if (i < textContent.length) {
          result.push({
            ...textContent[i],
            highlight: true // נוסיף את הסימון עצמו
          });
        }
      }
      
      // The text after
      if (end < textContent.length) {
        result.push(...textContent.slice(end));
      }
      
      // The actual cursor
      const cursorPosition = cursor.position;
      return [
        ...result.slice(0, cursorPosition),
        { char: "|", ...cursor.style },
        ...result.slice(cursorPosition)
      ];
    }
    
    // Case of selection-mode off, just show the cursor
    if (textContent.length === 0) {
      return [{ char: "|", ...cursor.style }];
    }

    return [
      ...textContent.slice(0, cursor.position),
      { char: "|", ...cursor.style },
      ...textContent.slice(cursor.position)
    ];
  }, [textContent, cursor, selection]);

  /* Turning on and off style (bold, underline) */
  const toggleStyle = useCallback((styleProperty) => {
    setCursor(current => ({
      ...current,
      style: {
        ...current.style,
        [styleProperty]: !current.style[styleProperty]
      }
    }));

    if (selection.active && selection.startPosition !== null && selection.endPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);
      
      setTextContent(current => {
        const newText = [...current];
        for (let i = start; i < end; i++) {
          if (i < newText.length) {
            newText[i] = {
              ...newText[i],
              [styleProperty]: !newText[i][styleProperty]
            };
          }
        }
        return newText;
      });
    }
  }, [selection]);


  const changeStyle = useCallback((property, value) => {
    setCursor(current => ({
      ...current,
      style: {
        ...current.style,
        [property]: value
      }
    }));

    // עכשיו כשאני חושב על זה בכל פונקציה במקום לבדוק אם מצב "בחירה" דולק
    // אם יהיה זמן לנסות לעשות פונקציה אחת שפשוט נקרא לה בכל פעם
    if (selection.active && selection.startPosition !== null && selection.endPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);
      
      setTextContent(current => {
        const newText = [...current];
        for (let i = start; i < end; i++) {
          if (i < newText.length) {
            newText[i] = {
              ...newText[i],
              [property]: value
            };
          }
        }
        return newText;
      });
    } 
  }, [selection]);

  /* ───── Editing actions (insert / delete / move) ───── */
  const insertCharacter = useCallback((char) => {
    const newChar = { char, ...cursor.style };
  
    if (selection.active && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end = Math.max(selection.startPosition, selection.endPosition);

      
      const next = [
        ...textContent.slice(0, start), newChar, ...textContent.slice(end)
      ];
      setTextContent(next);
      setCursor(c => ({ ...c, position: start + 1 }));
      setSelection({ active:false, startPosition:null, endPosition:null });
    } else {
      const next = [
        ...textContent.slice(0, cursor.position),
        newChar,
        ...textContent.slice(cursor.position)
      ];
      setTextContent(next);
      setCursor(c => ({ ...c, position: c.position + 1 }));
    }
  }, [cursor, selection, textContent, setTextContent]);
  
  /* ---------- Delete ---------- */
  const deleteCharacter = useCallback(() => {
    if (selection.active && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end   = Math.max(selection.startPosition, selection.endPosition);
  
      const next = [
        ...textContent.slice(0, start),
        ...textContent.slice(end)
      ];
      setTextContent(next);
      setCursor(c => ({ ...c, position: start }));
    }
    else if (cursor.position > 0) {             // מחיקה “רגילה”
      const next = [
        ...textContent.slice(0, cursor.position - 1),
        ...textContent.slice(cursor.position)
      ];
      setTextContent(next);
      setCursor(c => ({ ...c, position: c.position - 1 }));
    }
  }, [textContent, cursor, selection, setTextContent]);

  const deleteWord = useCallback(() => {
    // case of selecting on
    if (selection.active && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end   = Math.max(selection.startPosition, selection.endPosition);
      
      setTextContent(cur => [...cur.slice(0, start), ...cur.slice(end)]);
      setCursor(cur => ({ ...cur, position: start }));
      setSelection({ active: false, startPosition: null, endPosition: null });
    }
    else if (cursor.position > 0) {
      let wordStart = cursor.position;
      let foundWord = false;
      
      // Move backward until we find a space or start of line
      if (wordStart < textContent.length && textContent[wordStart].char === ' ') {
        while (wordStart > 0 && textContent[wordStart - 1].char !== ' ') {
          wordStart--;
        }
      }
      else {
        while (wordStart > 0) {
          if (textContent[wordStart - 1].char === ' ' && foundWord) {
            break;
          }

          if (textContent[wordStart - 1].char !== ' ') {
            foundWord = true;
          }
          wordStart--;
        }
      }

      
      // Delete from the start of the word till the cursor position
      setTextContent(cur => [
        ...cur.slice(0, wordStart), ...cur.slice(cursor.position)
      ]);
      setCursor(cur => ({ ...cur, position: wordStart }));
    }
  }, [cursor, selection, textContent]);

  /* Clear All */
  const clearAll = useCallback(() => {
    if (window.confirm("Are you sure that u wanna clear all the text?")) {
      setTextContent([]);
      setCursor(cur => ({ ...cur, position: 0 }));
      setSelection({ active: false, startPosition: null, endPosition: null });
    }

  }, [setTextContent]);

  /* Move the cursor */
  const moveCursorPosition = useCallback((dir) => {
    const delta = dir === "left" ? -1 : 1;
    const len   = textContent.length;
    const newPos = Math.max(0, Math.min(cursor.position + delta, len));

    if (selection.active) {
      if (selection.startPosition === null) {
        setSelection({ active:true, startPosition:cursor.position, endPosition:newPos });
      }
      else {
        setSelection(curSel => ({ ...curSel, endPosition:newPos }));
      }
    }
    else {
      setSelection({ active:false, startPosition:null, endPosition:null });
    }

    setCursor(cur => ({ 
      ...cur, 
      position:newPos 
    }));

  }, [cursor, textContent, selection]);



  const toggleSelectionMode = useCallback(() => {
    setSelection(current => {
      if (current.active) {
        return{
          active: false,
          startPosition: null,
          endPosition: null
        };
      }
      else {
        return {
          active: true,
          startPosition: cursor.position,
          endPosition: cursor.position
        };
      }
      // active: isActive,
      // startPosition: isActive ? cursor.position : null,
      // endPosition: isActive ? cursor.position :null
    });
  }, [cursor.position]);




  // files
  const handleSetText = useCallback((plainStr) => {
    const next = plainStr.split("").map(ch => ({ char: ch, style:{} }));
    setTextContent(next);
    setCursor(c => ({ ...c, position: next.length }));
  }, [setTextContent]);

/*   const handleSetText = (text) => {
    if (typeof text === 'string') {
      setTextContent(text.split("").map(ch => ({char: ch, ... cursor.style })));
    }
  }; */

  const handleFilesData = (fileData) => {
    // Try to parse as JSON (formatted text)
    try {
      const parsedData = JSON.parse(fileData);
      if (Array.isArray(parsedData)) {
        setTextContent(parsedData);
      }
      // If not valid formatted text, treat as plain text
      else {
        handleSetText(fileData);
      }
    }
    // If parsing fails, treat as plain text
    catch (e) {
      handleSetText(fileData);
    }
  };

  const getFileData = () => {
    return JSON.stringify(textContent);
  };

  /* ───── Render ───── */
  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">


      <Preview text={textContent.map(c=>c.char).join("")} />

      <StyleBar
        currentStyle={cursor.style}
        toggleStyle={toggleStyle}
        onStyleChange={changeStyle}
      />

      <div className="editor-rapper">
        <Editor text={getTextWithCursor()} />
        <div className="selection-status">
          {selection.active ? "Selection Mode Is Activeted" : ""}
        </div>
      </div>

      <FileManager
        text={getFileData()}
        setText={handleFilesData}
        filename={filename}
        setFilename={setFilename}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        
      />

      <button className="btn" onClick={() => setShowFind(true)}>Find / Replace</button>
      <FindReplaceDialog
        open={showFind}
        onClose={() => setShowFind(false)}
        text={plainText}                    // הפוך את textContent למחרוזת
        setText={str => handleSetText(str)} // ממיר חזרה למבנה-תוים
        
/>


      <Keyboard
        keyPressed={insertCharacter}
        backPressed={deleteCharacter}
        arrowPressed={moveCursorPosition}
        deleteWord={deleteWord}
        clearAll={clearAll}
        toggleSelection={toggleSelectionMode}
      />
    </div>

    
  );

}
