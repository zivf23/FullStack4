// בעצם מה שנעשה פה זה לתת לכל תו שהוא בעצם תיבה משל צ=עצמו א הייחוס שלו
// אנחנו רוצים שנוכל לתת לכל תו צבע , גודל, פונט ועוד שונה מהקודם לו
// לכן לא נוכל להתייחס לזה כסטרינג ואנחנו נתייחס לזה כרצף של צ'ארים
// פה בעצם נדאג לתת לכל תו בודד את היחס האישי שמגיע לו ונגדיר לו פונט וגודל וצבע מותאמים

import React from "react";

const CustomLetter = ({ charObj }) => {
  const { char, font, size, color, bold, italic, underline, highlight } = charObj;

  return (
    <span
      style={{
        font: font || 'Arial',
        fontSize: size || '16px',
        color: color || 'black',
        fontWeight: bold ? 'bold' : 'normal',
        fontStyle: italic ? 'italic' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        backgroundColor: highlight ? '#87CEFA' : 'transparent',
        display: "inline",
      }}
    >
      {char}
    </span>
  );
};

export default CustomLetter;
