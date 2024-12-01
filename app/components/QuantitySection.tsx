import styles from './QuantitySection.module.css';
import { QuantityType } from '../types/types';

const QuantitySection = ({
  title,
  quantityTypes,
  handleInputChange,
  prefix,
}: {
  title: string;
  quantityTypes: { [key in QuantityType]: number };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix: 'front' | 'rear';
}) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <div className={styles.quantitySection}>
      {Object.keys(quantityTypes).map((type) => (
        <div key={`${prefix}-${type}`} className={styles.inputRow}>
          <label htmlFor={`${prefix}-${type}`}>{type}</label>
          <input
            type="number"
            id={`${prefix}-${type}`}
            name={`${prefix}-${type}`}
            value={quantityTypes[type as QuantityType]}
            onChange={handleInputChange}
            min="0"
            className={styles.input}
          />
        </div>
      ))}
    </div>
  </div>
);

export default QuantitySection;
