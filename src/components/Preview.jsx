import React from "react";
export default function Preview({ text }) {
  return (
    <div className="flex-grow border rounded p-4 overflow-auto bg-white shadow-inner" style={{ minHeight: "150px" }}>
      {text.split("\n").map((line, idx) => (
        <p key={idx} className="whitespace-pre-wrap leading-relaxed">{line}</p>
      ))}
    </div>
  );
}