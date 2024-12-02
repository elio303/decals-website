'use client';

import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import { IFormInput } from '@/app/types/types';
import styles from '@/app/contact/page.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactForm() {
  const router = useRouter();
  const { formInput, setFormInput } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormInput((prev: IFormInput) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Form validation function
  const validateForm = () => {
    if (!formInput.firstName || !formInput.lastName || !formInput.email || !formInput.phoneNumber) {
      setError('All fields are required.');
      toast.error('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setError(null);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formInput),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(`Failed to send email: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        router.push('/confirmation');
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error);
        toast.error(`Failed to send email: ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          required 
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
          required 
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
          required 
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
          required 
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          'Submit'
        )}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
