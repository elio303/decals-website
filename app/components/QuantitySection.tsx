import styles from './QuantitySection.module.css';
import { QuantityType } from '../types/types';

interface QuantitySectionProps {
  title: string;
  quantityTypes: { [key in QuantityType]: number };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, prefix: string, type: QuantityType) => void;
  prefix: 'front' | 'rear';
}

const QuantitySection = ({
  title,
  quantityTypes,
  handleInputChange,
  prefix,
}: QuantitySectionProps) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <div className={styles.quantitySection}>
      {Object.keys(quantityTypes).map((type) => {
        const typeKey = type as QuantityType;
        return (
          <div key={`${prefix}-${type}`} className={styles.inputRow}>
            <label htmlFor={`${prefix}-${type}`}>{type}</label>
            <input
              type="number"
              id={`${prefix}-${type}`}
              name={`${prefix}-${type}`}
              value={quantityTypes[typeKey] === 0 ? '0' : quantityTypes[typeKey].toString()}
              onChange={(e) => handleInputChange(e, prefix, typeKey)}
              min="0"
              className={styles.input}
            />
          </div>
        );
      })}
    </div>
  </div>
);

export default QuantitySection;
