import React from "react";
import { isRTL } from "./testSide"; // ראה הערות שם לצורך
import CustomLetter from "./CustomChar";

const Editor = ({ text = [] }) => {
  if (!text || text.length === 0) {
    return <div className="editor-container"></div>
  }

  const spliteTextToLines = () => {
    const lines = [];
    let currentLine = [];

    text.forEach(char => {
      if (char.char === '\n') {
        lines.push(currentLine);
        currentLine=[];
      }
      else {
        currentLine.push(char);
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  };

  const lines = spliteTextToLines();

  return (
    <div className="editor-container">
      {lines.map((line, lineIndex) => {
        const rtl = line.length > 0 && isRTL(text)

        return (
          <div 
          
            key = {`line-${lineIndex}`}
            className = "text-line"
            style = {{
              direction: rtl ? 'rtl' : ltr,
              textAlign: rtl ? 'right' : 'left',
              display: 'block',
              width: '100%'
            }}
          >
            {line.map((charObj, charIndex) => (
              <CustomLetter
                key = {`char-${lineIndex}-${charIndex}`}
                charData = {charObj}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Editor;

/* export default function Editor({ value, onChange }) {
  return (
    <textarea
      className="editor flex-grow border rounded p-2 h-48"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
} */