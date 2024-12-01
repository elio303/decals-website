'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/customize/page.module.css';
import { useFormContext } from '@/context/FormContext';
import FootballCustomization from '@/app/components/FootballCustomization';
import BaseballCustomization from '@/app/components/BaseballCustomization';

const Customize = () => {
  const router = useRouter();
  const { formInput } = useFormContext();
  const isBaseball = formInput.sport === 'baseball';

  const navigateToContact = () => {
    router.push('/contact');
  };

  return (
    <div className={styles.container}>
      { isBaseball ? <BaseballCustomization /> : <FootballCustomization /> }

      <button type="button" onClick={navigateToContact} className={styles.button}>
        Next
      </button>
    </div>
  );
}

export default Customize;
