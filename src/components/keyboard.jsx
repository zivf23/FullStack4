import React, { useState } from "react";
import Key from "./singleKey"; 

const layouts = {
    // I'll make 4 diferent kind of keyboards and I'll switch between them insted of making one complex one
    // because I want the munbers to apper in every lenguage keyboard I'll repeate them in every one that way it will be simplier/
  upEnglish: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    specialKeys: ['\n', ' '],
    special: { '\n': 'enter', ' ': 'space' }, // in order to make a new row we'll use the word "enter" and fot space, space.
  },
  lowEnglish: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    specialKeys: ['\n', ' '],
    special: { '\n': 'enter', ' ': 'space' },
  },
  hebrew: {
    number: ['1','2','3','4','5','6','7','8','9','0'],
    letters: 'אבגדהוזחטיכלמנסעפצקרשת'.split(''),
    specialKeys: ['\n', ' '],
    special: { '\n': 'רד שורה', ' ': 'רווח' },
  },
  emojies: {
    letters: ['😂', '❤️', '👍', '😎'], // to add emojies(thanks to GTP for easy copy-paste of emojies easyily)
    specialKeys: ['\n', ' '],
    special: { '\n': 'enter', ' ': 'space' },
  }
};

const Keyboard = ({ onKeyPress, onBackPress, onArrowPress}) => {
  const [language, setLanguage] = useState("upEnglish");
  const languageOrder = ["upEnglish", "lowEnglish", "hebrew", "emojies"];

  // switch between languages in the order above
  const switchLanguage = () => {
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  const { number, letters, special } = layouts[language];

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={switchLanguage}>Switch Language ({language.toUpperCase()})</button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "600px",
          marginTop: "10px",
          justifyContent: "center"
        }}
      >
        {[...number, ...letters, '\n', ' '].map((key, index) => (
          <Key
            key={index}
            char={key}
            onClick={onKeyPress}
            altText={special[key] || ""}
          />
        ))}
        <Key
          key="backspace"
          char="⌫" // לבדוק מה הקיצור דרך לסימון של מחק
          onClick={onBackPress}
          altText="" />
          <Key
          key="left"
          char="⬅"
          onClick={onArrowPress} // לבוסיף פה ולמטה סימונים של חצים ימינה ושמאלה, שוב תודה לג'יפי
          altText="<<<<<<<<<<<<" /> 
          <Key
          key="right"
          char="➡"
          onClick={onArrowPress}
          altText=">>>>>>>>>>>>" /> 
      </div>
    </div>
  );
};

export default Keyboard;