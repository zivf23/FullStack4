// בעצם מה שנעשה פה זה לתת לכל תו שהוא בעצם תיבה משל צ=עצמו א הייחוס שלו
// אנחנו רוצים שנוכל לתת לכל תו צבע , גודל, פונט ועוד שונה מהקודם לו
// לכן לא נוכל להתייחס לזה כסטרינג ואנחנו נתייחס לזה כרצף של צ'ארים
// פה בעצם נדאג לתת לכל תו בודד את היחס האישי שמגיע לו ונגדיר לו פונט וגודל וצבע מותאמים

import React from "react";

const CustomLetter = ({ charObj }) => {
  const { char, font, size, color } = charObj;

  return (
    <span
      style={{
        font: font,
        fontSize: size,
        color: color,
        display: "inline",
      }}
    >
      {char}
    </span>
  );
};

export default CustomLetter;
