// components/PricingSection.tsx
import styles from './PricingSection.module.css';

const PricingSection = ({
  title,
  frontCost,
  rearCost,
  subTotal,
  label,
}: {
  title: string;
  frontCost: number;
  rearCost: number;
  subTotal: number;
  label: string;
}) => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <p>{label} Front Cost: ${frontCost.toFixed(2)}</p>
    <p>{label} Rear Cost: ${rearCost.toFixed(2)}</p>
    <h3 className={styles.highlight}>{label} Sub-total: ${subTotal.toFixed(2)}</h3>
  </div>
);

export default PricingSection;
