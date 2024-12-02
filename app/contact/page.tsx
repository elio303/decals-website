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

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formInput),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      router.push('/confirmation');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the email. Please try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h2 className={styles.title}>Contact Us</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formInput.firstName}  
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
          value={formInput.lastName} 
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
          value={formInput.email} 
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
          value={formInput.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <button type="button" onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
    </form>
  );
}
