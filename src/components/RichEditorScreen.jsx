import React, { useState, useCallback } from "react";
import Preview     from "./Preview";
import FileManager from "./FileManager";
import Keyboard    from "./Keyboard";
import Editor      from "./Editor";
import StyleBar    from "./StyleBar";

/* ───────── קומפוננטה ───────── */
export default function RichEditorScreen() {

  /* 1️⃣  Tabs */
  const [docs, setDocs] = useState([
    { id: 1, title: "Untitled 1", content: [] }
  ]);
  const [activeId, setActiveId] = useState(1);
  const activeDoc   = docs.find(d => d.id === activeId) || docs[0];
  const textContent = Array.isArray(activeDoc.content) ? activeDoc.content : [];

  /* 2️⃣  File-meta לטובת FileManager */
  const [fileMeta, setFileMeta] = useState({ name: null, id: null });

  /* 3️⃣  Cursor + Selection */
  const [cursor, setCursor] = useState({
    position: 0,
    style: { font:"Arial", size:"20px", color:"#000000", bold:false, italic:false }
  });
  const [selection, setSelection] = useState({
    active:false, startPosition:null, endPosition:null
  });

  /* — helper: שמירה בטאב הפעיל — */
  const setTextContent = (arr) =>
    setDocs(ds => ds.map(d =>
      d.id === activeId ? { ...d, content: arr } : d
    ));

  /* — helper: array + cursor — */
  const getTextWithCursor = useCallback(() => {
    if (!textContent.length)
      return [{ char:"|", ...cursor.style }];
    return [
      ...textContent.slice(0, cursor.position),
      { char:"|", ...cursor.style },
      ...textContent.slice(cursor.position)
    ];
  }, [textContent, cursor]);

  /* 4️⃣  Style toggles */
  const toggleStyle = (prop) =>
    setCursor(c => ({ ...c, style:{ ...c.style, [prop]:!c.style[prop] }}));

  const changeStyle = (prop, val) => {
    setCursor(c => ({ ...c, style:{ ...c.style, [prop]:val }}));
    /* החלה על סימון */
    if (selection.active && selection.startPosition!==null) {
      const s = Math.min(selection.startPosition,selection.endPosition);
      const e = Math.max(selection.startPosition,selection.endPosition);
      setTextContent(tc => tc.map((ch,i)=>
        i>=s && i<e ? { ...ch, [prop]:val } : ch
      ));
    }
  };

  const insertCharacter = (ch) => {
    const newChar = { char: ch, ...cursor.style };
  
    if (selection.active && selection.startPosition !== null) {
      const s = Math.min(selection.startPosition, selection.endPosition);
      const e = Math.max(selection.startPosition, selection.endPosition);
      setTextContent(tc => [...tc.slice(0, s), newChar, ...tc.slice(e)]);
      setCursor(c => ({ ...c, position: s + 1 }));
      setSelection({ active: false, startPosition: null, endPosition: null });
    } else {
      setTextContent(tc => [
        ...tc.slice(0, cursor.position), newChar, ...tc.slice(cursor.position)
      ]);
      setCursor(c => ({ ...c, position: c.position + 1 }));
    }
  };
  
  /* ---------- Delete ---------- */
  const deleteCharacter = () => {
    if (selection.active && selection.startPosition !== null) {
      const s = Math.min(selection.startPosition, selection.endPosition);
      const e = Math.max(selection.startPosition, selection.endPosition);
      setTextContent(tc => [...tc.slice(0, s), ...tc.slice(e)]);
      setCursor(c => ({ ...c, position: s }));
      setSelection({ active: false, startPosition: null, endPosition: null });
    } else if (cursor.position > 0) {
      setTextContent(tc => [
        ...tc.slice(0, cursor.position - 1), ...tc.slice(cursor.position)
      ]);
      setCursor(c => ({ ...c, position: cursor.position - 1 }));
    }
  };
  
  /* ---------- Move cursor ---------- */
  const moveCursorPosition = (dir) => {
    const delta = dir === "left" ? -1 : 1;
    const len   = textContent.length;
    const pos   = Math.max(0, Math.min(cursor.position + delta, len));
    setCursor(c => ({ ...c, position: pos }));
  };
  /* 6️⃣  Render */
  return (
    <div className="flex flex-col h-screen p-4 gap-4 bg-gray-50">

      {/* Tabs */}
      <div style={{display:"flex",gap:"4px",borderBottom:"1px solid #ccc"}}>
        {docs.map(doc=>(
          <button key={doc.id}
            style={{padding:"4px 8px",
              background:doc.id===activeId?"#ddd":"#f6f6f6"}}
            onClick={()=>setActiveId(doc.id)}>
            {doc.title}
            <span style={{marginLeft:4,cursor:"pointer"}}
              onClick={e=>{
                e.stopPropagation();
                setDocs(ds=>ds.filter(d=>d.id!==doc.id));
                if(activeId===doc.id) setActiveId(ds[0]?.id || null);
              }}>×</span>
          </button>
        ))}
        <button onClick={()=>{
          const id = Date.now();
          setDocs(ds=>[...ds,{id,title:`Doc ${ds.length+1}`,content:[]}]);
          setActiveId(id);
        }}>＋</button>
      </div>

      <Preview text={textContent.map(c=>c.char).join("")} />

      <StyleBar
        currentStyle={cursor.style}
        toggleStyle={toggleStyle}
        onStyleChange={changeStyle}
      />

      <Editor text={getTextWithCursor()} />

      <FileManager
        text={textContent.map(c=>c.char).join("")}
        setText={txt=>{
          const arr = (typeof txt === "string")
            ? txt.split("").map(ch=>({char:ch,...cursor.style}))
            : txt;
          setTextContent(arr);
        }}
        fileMeta={fileMeta}
        setFileMeta={setFileMeta}
      />

      <Keyboard
        keyPressed={insertCharacter}
        backPressed={deleteCharacter}
        arrowPressed={moveCursorPosition}
        selecting={selection.active}
        setSelection={setSelection}
      />
    </div>
  );
}
