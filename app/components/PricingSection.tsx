// components/PricingSection.tsx
import styles from './PricingSection.module.css';

const PricingSection = ({
  title,
  subTotal,
}: {
  title: string;
  subTotal: number;
}) => (
  <div className={styles.card}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <h3 className={styles.highlight}>${subTotal.toFixed(2)}</h3>
  </div>
);

export default PricingSection;
