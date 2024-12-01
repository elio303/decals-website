'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/page.module.css';
import { Sport } from './types/types';
import { useFormContext } from '@/context/FormContext';
import { IFormInput } from './types/types';

export default function Home() {
  const router = useRouter();
  const { setFormInput } = useFormContext();

  const handleSportSelect = (sport: Sport) => {
    setFormInput((prev: IFormInput) => {
      return {
        ...prev,
        sport,
      };
    });
    router.push('/customize');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>CHOOSE YOUR SPORT</h2>
      <div className={styles.sportContainer}>
        <div
          className={styles.sport}
          onClick={() => handleSportSelect('baseball')}
        >
          <Image
            src="/baseball-helmet.png"
            alt="Baseball Helmet"
            width={200}
            height={200}
          />
        </div>
        <div
          className={styles.sport}
          onClick={() => handleSportSelect('football')}
        >
          <Image
            src="/football-helmet.png"
            alt="Football Helmet"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
