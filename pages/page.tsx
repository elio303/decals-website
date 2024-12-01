'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleSportSelect = (sport: string) => {
    router.push(`/customize?sport=${sport}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>CHOOSE YOUR SPORT</h2>
      <div className={styles.sportContainer}>
        <div
          className={styles.sport}
          onClick={() => handleSportSelect('Baseball Helmet')}
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
          onClick={() => handleSportSelect('Football Helmet')}
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
