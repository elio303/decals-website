import React from 'react';
import styles from './ColorInput.module.css';

const ColorInput = ({ id, label, value, onChange }: { id: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className={styles.inputRow}>
    <label htmlFor={id}>{label}:</label>
    <input
      type="color"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className={styles.input}
    />
  </div>
);

export default ColorInput;
