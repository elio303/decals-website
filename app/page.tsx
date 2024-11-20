'use client';

import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>3D Bumpers</h1>
      <h2 className={styles.subtitle}>CHOOSE YOUR SPORT</h2>
      <div className={styles.sportContainer}>
        <div
          className={styles.sport}
          onClick={() => alert('Baseball Helmet Selected')}
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
          onClick={() => alert('Football Helmet Selected')}
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
};

export default Home;
