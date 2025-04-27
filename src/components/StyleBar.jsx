import React from 'react';
import './StyleBar.css';

/**
@param {Object} currentStyle - סגנון הטקסט הנוכחי
@param {Function} onStyleChange - פונקציה להחלפת סגנון
@param {Function} toggleStyle - פונקציה להפעלת סגנון
@returns {JSX.Element}
*/
const StyleBar = ({ currentStyle, onStyleChange, toggleStyle }) => {
  const fontOptions = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'David',
    'Aptos',
    'Guttman Yad',
    'Tahoma',
    'Verdana',
    'Georgia'
  ];

  const sizeOptions = [
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '28px',
    '32px',
    '36px',
    '42px'
  ];

  const colorOptions = [
        { name: 'Black',  value: '#000000' },
        { name: 'Red',    value: '#ff0000' },
        { name: 'Blue',   value: '#0000ff' },
        { name: 'Green',  value: '#00aa00' },
        { name: 'Yellow', value: '#ffff00' },
        { name: 'Purple', value: '#800080' },
        { name: 'Orange', value: '#ff7f00' },
        { name: 'Pink',   value: '#ff69b4' },
        { name: 'Gray',   value: '#808080' }
    ];
  return (
    <div className="style-bar">
      {/* Font */}
      <div className="style-group">
        <label htmlFor="font-select">גופן:</label>
        <select
          id="font-select"
          value={currentStyle.font}
          onChange={(e) => onStyleChange('font', e.target.value)}
          className="style-select"
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Text Size */}
      <div className="style-group">
        <label htmlFor="size-select">גודל:</label>
        <select
          id="size-select"
          value={currentStyle.size}
          onChange={(e) => onStyleChange('size', e.target.value)}
          className="style-select"
        >
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div className="style-group">
        <label htmlFor="color-select">צבע:</label>
        <select
          id="color-select"
          value={currentStyle.color}
          onChange={(e) => onStyleChange('color', e.target.value)}
          className="style-select"
        >
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
        <div
          className="color-preview"
          style={{ backgroundColor: currentStyle.color }}
        ></div>
      </div>

      {/* BUttons */}
      <div className="style-buttons">
        <button
          className={`style-button ${currentStyle.bold ? 'active' : ''}`}
          onClick={() => toggleStyle('bold')}
          title="Bold"
        >
          <strong>B</strong>
        </button>

        <button
          className={`style-button ${currentStyle.italic ? 'active' : ''}`}
          onClick={() => toggleStyle('italic')}
          title="Italic"
        >
          <i>I</i>
        </button>

        <button
          className={`style-button ${currentStyle.underline ? 'active' : ''}`}
          onClick={() => toggleStyle('underline')}
          title="Underline"
        >
          <u>U</u>
        </button>
      </div>

      {/* Color Button */}
      <div className="style-group color-picker-group">
        <label htmlFor="custom-color">Color:</label>
        <input
          type="color"
          id="custom-color"
          value={currentStyle.color}
          onChange={(e) => onStyleChange('color', e.target.value)}
          className="color-picker"
        />
      </div>
    </div>
  );
};

export default StyleBar;














/* import React, { useState } from "react";


export default function StyleBar({ onStyleChange }) {

  
    const [activeStyles, setActiveStyles] = useState({
        bold: false,
        underline: false,
        fontColor: "#000000",
        fontFamily: "Arial",
        fontSize: "14",
    });


    const toggleStyle = (style) => {
        setActiveStyles((prev) => {
            const updated = { ...prev, [style]: !prev[style] };
            onStyleChange(updated);
            return updated;
        });
    };


    const changeFontColor = (e) => {
        const color = e.target.value;
        setActiveStyles((prev) => {
            const updated = { ...prev, fontColor: color };
            onStyleChange(updated);
            return updated;
        });
    };


    const changeFontSize = (e) => {
        const size = e.target.value;
        setActiveStyles((prev) => {
            const updated = { ...prev, fontSize: size };
            onStyleChange(updated);
            return updated;
        });
    };


    const changeFontFamily = (e) => {
        const font = e.target.value;
        setActiveStyles((prev) => {
            const updated = { ...prev, fontFamily: font };
            onStyleChange(updated);
            return updated;
        });
    };

    return (

        <div className={styles.bar}>


            <StyleButton label="B" active={activeStyles.bold} onClick={() => toggleStyle("bold")} />
            <StyleButton label="U" active={activeStyles.underline} onClick={() => toggleStyle("underline")} />


            <input
                type="color"
                value={activeStyles.fontColor}
                onChange={changeFontColor}
                className={styles.colorPicker}
            />


            <select
                value={activeStyles.fontSize}
                onChange={changeFontSize}
                className={styles.select}
            >

            {[12, 14, 16, 18, 24, 32, 48].map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
            ))}
            </select>


            <select
                value={activeStyles.fontFamily}
                onChange={changeFontFamily}
                className={styles.select}
            >

            {["Arial", "Times New Roman", "Aptos"].map((font) => (
                <option key={font} value={font}>
                    {font}
                </option>
            ))}

            </select>

        </div>
    );
}

 */