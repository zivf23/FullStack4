import React from "react";

const Cursor = () => {
  return (
    <span
      style={{
        display: "inline-block",
        width: "1px",
        height: "1em",
        backgroundColor: "black",
        animation: "blink 1s step-start infinite",
        verticalAlign: "text-bottom"
      }}
    ></span>
  );
};

export default Cursor;
