'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function Customize() {
  const [formInput, setFormInput] = useState({
    bumperColor: '#ffffff',
    innerTextColor: '#000000',
    outlineColor: '#ff0000', // Default text outline color
    frontFont: 'Arial',       // Front bumper font
    backFont: 'Arial',       // Back bumper font
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customize Your Bumper</h1>
      <form className={styles.form}>
        <label>
          Bumper Color:
          <input
            type="color"
            name="bumperColor"
            value={formInput.bumperColor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Inner Text Color:
          <input
            type="color"
            name="innerTextColor"
            value={formInput.innerTextColor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Text Outline Color:
          <input
            type="color"
            name="outlineColor"
            value={formInput.outlineColor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Front Bumper Font:
          <select
            name="frontFont"
            value={formInput.frontFont}
            onChange={handleInputChange}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
          </select>
        </label>
        <label>
          Back Bumper Font:
          <select
            name="backFont"
            value={formInput.backFont}
            onChange={handleInputChange}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
          </select>
        </label>
      </form>

      <div className={styles.simulationContainer}>
        <h3>Preview</h3>
        <div
          className={styles.bumper}
          style={{
            backgroundColor: formInput.bumperColor,
            color: formInput.innerTextColor,
            fontFamily: formInput.frontFont,
            textShadow: `-1px -1px 0 ${formInput.outlineColor}, 
                          1px -1px 0 ${formInput.outlineColor}, 
                          -1px 1px 0 ${formInput.outlineColor}, 
                          1px 1px 0 ${formInput.outlineColor}`,
          }}
        >
          Front Bumper
        </div>
        <div
          className={styles.bumper}
          style={{
            backgroundColor: formInput.bumperColor,
            color: formInput.innerTextColor,
            fontFamily: formInput.backFont,
            textShadow: `-1px -1px 0 ${formInput.outlineColor}, 
                          1px -1px 0 ${formInput.outlineColor}, 
                          -1px 1px 0 ${formInput.outlineColor}, 
                          1px 1px 0 ${formInput.outlineColor}`,
          }}
        >
          Back Bumper
        </div>
      </div>
    </div>
  );
}
