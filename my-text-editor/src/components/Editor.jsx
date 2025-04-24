import React from "react";
export default function Editor({ value, onChange }) {
  return (
    <textarea
      className="editor flex-grow border rounded p-2 h-48"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}