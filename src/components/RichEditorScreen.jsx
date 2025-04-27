import React, { useState, useCallback } from "react";
import Preview  from "./Preview";
import FileManager from "./FileManager";
import Keyboard from "./keyboard";
import Editor from "./Editor";
import StyleBar from "./StyleBar";
/* ---------- Component ---------- */
export default function RichEditorScreen() {
  /* text – מערך אובייקטים {char, font, size, …} */
  const [textContent, setTextContent] = useState([]);
  const [filename, setFilename] = useState(null);

  /* cursor */
  const [cursor, setCursor] = useState({
    position: 0,
    style: { font: "Arial", size: "20px", color: "black",
             bold: false, italic: false, underline: false }
  });

  /* selection */
  const [selection, setSelection] = useState({
    active: false,
    startPosition: null,
    endPosition: null,
  });

  /* ───── Helpers ───── */
  const getTextWithCursor = useCallback(() => {
    if (textContent.length === 0) return [{ char: "|", ...cursor.style }];

    return [
      ...textContent.slice(0, cursor.position),
      { char: "|", ...cursor.style },
      ...textContent.slice(cursor.position)
    ];
  }, [textContent, cursor]);

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
              [styleProperty]: !cursor.style[styleProperty]
            };
          }
        }
        return newText;
      });
    }
  }, [selection, cursor.style]);


  const changeStyle = useCallback((property, value) => {
    setCursor(current => ({
      ...current,
      style: {
        ...current.style,
        [property]: value
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
      const end   = Math.max(selection.startPosition, selection.endPosition);

      setTextContent(cur => [
        ...cur.slice(0, start), newChar, ...cur.slice(end)
      ]);
      setCursor(cur => ({ ...cur, position: start + 1 }));
      setSelection({ active:false, startPosition:null, endPosition:null });
    } else {
      setTextContent(cur => [
        ...cur.slice(0, cursor.position), newChar, ...cur.slice(cursor.position)
      ]);
      setCursor(cur => ({ ...cur, position: cur.position + 1 }));
    }
  }, [cursor, selection]);

  const deleteCharacter = useCallback(() => {
    if (selection.active && selection.startPosition !== null) {
      const start = Math.min(selection.startPosition, selection.endPosition);
      const end   = Math.max(selection.startPosition, selection.endPosition);

      setTextContent(cur => [...cur.slice(0, start), ...cur.slice(end)]);
      setCursor(cur => ({ ...cur, position: start }));
      setSelection({ active:false, startPosition:null, endPosition:null });
    } else if (cursor.position > 0) {
      setTextContent(cur => [
        ...cur.slice(0, cursor.position - 1), ...cur.slice(cursor.position)
      ]);
      setCursor(cur => ({ ...cur, position: cursor.position - 1 }));
    }
  }, [cursor, selection]);

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
      
      // Move backward until we find a space or start of line
      while (wordStart > 0 && textContent[wordStart - 1].char !== ' ' && textContent[wordStart - 1].char !== '\n') {
        wordStart--;
      }
      
      // Delete from the start of the word till the cursor position
      setTextContent(cur => [
        ...cur.slice(0, wordStart), ...cur.slice(cursor.position)
      ]);
      setCursor(cur => ({ ...cur, position: wordStart }));
    }
  }, [cursor, selection, textContent]);

  const clearAll = useCallback(() => {
    setTextContent([]);
    setCursor(cur => ({ ...cur, position: 0 }));
    setSelection({ active: false, startPosition: null, endPosition: null });
  }, []);

  const moveCursorPosition = useCallback((dir) => {
    const delta = dir === "left" ? -1 : 1;
    const len   = textContent.length;
    const newPos = Math.max(0, Math.min(cursor.position + delta, len));

    if (selection.active) {
      if (selection.startPosition === null) {
        setSelection({ active:true, startPosition:cursor.position, endPosition:newPos });
      } else {
        setSelection(curSel => ({ ...curSel, endPosition:newPos }));
      }
    } else {
      setSelection({ active:false, startPosition:null, endPosition:null });
    }
    setCursor(cur => ({ ...cur, position:newPos }));
  }, [cursor, textContent, selection]);



  // files
  const toggleSelectionMode = useCallback((isActive) => {
    setSelection({
      active: isActive,
      startPosition: isActive ? cursor.position : null,
      endPosition: isActive ? cursor.position :null
    });
  }, [cursor.position]);

  const handleSetFile = (text) => {
    setTextContent(text.split("").map(ch => ({char: ch, ...cursor.style})));
  }

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
      <Preview text={textContent.map(c => c.char).join("")} />

      <StyleBar 
        currentStyle={cursor.style}
        onStyleChange={changeStyle}
        toggleStyle={toggleStyle}
      />

      <Editor text={getTextWithCursor()} />

      <FileManager
        text={getFileData()}
        setText={handleFilesData}
        filename={filename}
        setFilename={setFilename}
      />

      <Keyboard
        keyPressed={insertCharacter}
        backPressed={deleteCharacter}
        arrowPressed={moveCursorPosition}
        deleteWord={deleteWord}
        clearAll={clearAll}
      />
    </div>
  );
}
