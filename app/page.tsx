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
      <div className={styles.chooseSportBar}>
        <h2>CHOOSE YOUR SPORT</h2>
      </div>
      <div className={styles.sportContainer}>
      <div
          className={styles.sport}
          onClick={() => handleSportSelect('baseball')}
        >
          <Image
            src="/baseball-helmet.png"
            alt="Baseball Helmet"
            width={500}
            height={500}
            priority
          />
        </div>
        <div
          className={styles.sport}
          onClick={() => handleSportSelect('hockey')}
        >
          <Image
            src="/hockey-helmet.png"
            alt="Hockey Helmet"
            width={500}
            height={500}
            priority
          />
        </div>
        <div
          className={styles.sport}
          onClick={() => handleSportSelect('football')}
        >
          <Image
            src="/football-helmet.png"
            alt="Football Helmet"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </div>
  );
}
