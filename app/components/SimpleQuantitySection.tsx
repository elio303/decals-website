import styles from './SimpleQuantitySection.module.css';

const SimpleQuantitySection = ({
  min,
  name,
  title,
  quantity,
  handleInputChange,
}: {
  min: number;
  name: string;
  title: string;
  quantity: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className={styles.card}>
    <h3>{title}</h3>
    <div className={styles.quantitySection}>
    <div className={styles.inputRow}>
        <input
        type="number"
        id={title}
        name={name}
        value={quantity}
        onChange={handleInputChange}
        min={min}
        className={styles.input}
        />
    </div>
    </div>
  </div>
);

export default SimpleQuantitySection;
