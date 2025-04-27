import React, { useState, useCallback } from "react";
import Preview  from "./Preview";
import FileManager from "./FileManager";
import Keyboard from "./Keyboard";
import Editor from "./Editor";	
/* ---------- Component ---------- */
export default function RichEditorScreen() {
  /* text – מערך אובייקטים {char, font, size, …} */
  const [textContent, setTextContent] = useState([]);

  /* cursor */
  const [cursor, setCursor] = useState({
    position: 0,
    style: { font: "Arial", size: "20px", color: "black",
             bold: false, italic: false }
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

  /* ───── Render ───── */
  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">
      <Preview text={textContent.map(c => c.char).join("")} />

      <Editor text={getTextWithCursor()} />

      <FileManager
        text={textContent.map(c => c.char).join("")}
        setText={(txt) =>
          setTextContent(txt.split("").map(ch => ({ char: ch, ...cursor.style })))
        }
      />

      <Keyboard
        keyPressed={insertCharacter}
        backPressed={deleteCharacter}
        arrowPressed={moveCursorPosition}
        selecting={selection}
        setSelection={setSelection}
      />
    </div>
  );
}
