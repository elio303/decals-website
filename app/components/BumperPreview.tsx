// components/BumperPreview.tsx
import Image from 'next/image';
import styles from './BumperPreview.module.css';
import { BumperType } from '../types/types';

const BumperPreview = ({
  bumperType,
  bumperColor,
  textColor,
  outlineColor,
  label,
}: {
  bumperType: BumperType;
  bumperColor: string;
  textColor: string;
  outlineColor: string;
  label: string;
}) => (
  <div className={styles.card}>
    <h3>{label} Bumper Preview</h3>
    <div
      className={styles.bumper}
      style={{
        backgroundColor: bumperColor,
        color: textColor,
        border: `2px solid ${outlineColor}`,
      }}
    >
      {bumperType === "Logo" ? (
        <Image src="/logo.jpg" alt={`${label} Logo`} width={200} height={100} priority />
      ) : (
        <div className={styles.bumperText}>{`${label} Bumper Text`}</div>
      )}
    </div>
  </div>
);

export default BumperPreview;
