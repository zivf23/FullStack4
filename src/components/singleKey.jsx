import React from "react";

const KeyButton = ({ char, onClick, altText }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(char);
    }
  };

  // for each indevidual key we'll make a button
  return (
    <button
      onClick={handleClick}
      style={{
        margin: "5px",
        padding: "10px 12px",
        fontSize: "18px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#f4f4f4",
        transition: "background-color 0.2s",
      }}
      title={altText}
    >
      {altText || char}
    </button>
  );
};

export default KeyButton;
