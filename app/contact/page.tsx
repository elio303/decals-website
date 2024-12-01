'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import { IFormInput } from '@/app/types/types';
import styles from '@/app/contact/page.module.css'; 

export default function ContactForm() {
  const router = useRouter();
  const { formInput, setFormInput } = useFormContext(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormInput((prev: IFormInput) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const navigateToConfirmation = () => {
    console.log(formInput);
    router.push('/confirmation');
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Contact Us</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formInput.firstName}  // Use formInput from context
          onChange={handleChange}
          placeholder="Enter your first name"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formInput.lastName} // Use formInput from context
          onChange={handleChange}
          placeholder="Enter your last name"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formInput.email} // Use formInput from context
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          value={formInput.phoneNumber} // Use formInput from context
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <button type="button" onClick={navigateToConfirmation} className={styles.button}>
        Submit
      </button>
    </form>
  );
}
