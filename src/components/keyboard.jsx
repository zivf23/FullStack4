import React, { useState } from "react";
import Key from "./singleKey"; 
import { layouts } from "./KeyboardLanguages"
import "../App.css";

export default function Keyboard ({ keyPressed, backPressed, arrowPressed, deleteWord, clearAll, toggleSelection }) {
  const [language, setLanguage] = useState("lowEnglish");
  const languageOrder = ["lowEnglish", "upEnglish", "hebrew", "emojies"];

  // switch between languages in the order above
  const switchLanguage = () => {
    const currentIndex = languageOrder.indexOf(language);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setLanguage(languageOrder[nextIndex]);
  };

  const layout = layouts[language];
  // const rows = [
  //   layout.numbers,
  //   layout.letters1,
  //   layout.letters2,
  //   layout.letters3,
  // ];
  const special = layout.special;

  return (
    <div className="keyboard-conteiner">
      <div className="keyboard-layout">

        {/* first row */}
        <div className="row">
          {layout.numbers.map((key, i) => (
            <Key key={i} char={key} onClick={keyPressed} />
          ))}
          <Key char="delete" altText={special.delete} onClick={backPressed} />
          <Key char="clear" altText="Clear All" wide onClick={clearAll} />
        </div>


        {/* second row */}
        <div className="row">
          {layout.letters1.map((key, i) => (
            <Key key={i} char={key} onClick={keyPressed} />
          ))}
          <Key char="language"  altText={special.language} onClick={switchLanguage} />
          <Key char="deleteWord" altText="Delete Word" wide onClick={deleteWord} />
        </div>


        {/* third row */}
        <div className="row">
          {layout.letters2.map((key, i) => (
            <Key key={i} char={key} onClick={keyPressed} />
          ))}
          <Key char="enter" altText={special.enter} wide onClick={() => keyPressed("\n")} />
        </div>

        {/* fourth row */}
        <div className="row">
          <Key char="shift" altText={special.shift} wide onClick={() => {}} />
          {layout.letters3.map((key, i) => (
            <Key key={i} char={key} onClick={keyPressed} />
          ))}
          <Key char="select" altText="select" wide onClick={toggleSelection} />
        </div>

        {/* fifth row */}
        <div className="row">
          <Key char="ctrl" altText={special.ctrl} wide onClick={() => {}} />
          <Key char="alt" altText={special.alt} onClick={() => {}} />
          <Key char="space" altText={special.space} wide onClick={() => keyPressed(" ")} />
          <Key char="alt" altText={special.alt} onClick={() => {}} />
          <Key char="ctrl" altText={special.ctrl} wide onClick={() => {}} />
          <Key char="left" altText={special.left} onClick={() => arrowPressed("left")} />
          <Key char="right" altText={special.right} onClick={() => arrowPressed("right")} />
        </div>

      </div>
    </div>
  );
};
