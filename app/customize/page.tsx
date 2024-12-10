'use client';

import { useRouter } from 'next/navigation';
import styles from '@/app/customize/page.module.css';
import { useFormContext } from '@/context/FormContext';
import FootballCustomization from '@/app/components/FootballCustomization';
import BaseballCustomization from '@/app/components/BaseballCustomization';
import HockeyCustomization from '@/app/components/HockeyCustomization';

const Customize = () => {
  const router = useRouter();
  const { formInput } = useFormContext();
  
  const getSportCustomization = () => {
    switch (formInput.sport) {
      case ('baseball'):
        return (<BaseballCustomization />);
      case ('football'):
        return (<FootballCustomization />);
      case ('hockey'):
        return (<HockeyCustomization />);
      default:
        return (<BaseballCustomization />);
    }
  }

  const navigateToContact = () => {
    router.push('/contact');
  };

  return (
    <div className={styles.container}>
      { getSportCustomization() }
      <button type="button" onClick={navigateToContact} className={styles.button}>
        Next
      </button>
    </div>
  );
}

export default Customize;
