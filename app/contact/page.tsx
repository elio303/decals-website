'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface FormInput {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    frontBumperType: string;
    rearBumperType: string;
    frontQuantityTypes: Record<string, number>;
    rearQuantityTypes: Record<string, number>;
    frontBumperColor: string;
    rearBumperColor: string;
    textColor: string;
    outlineColor: string;
}
export default function ContactForm() {
  const [formInput, setFormInput] = useState<FormInput | null>(null); // To store combined data
  const [contactForm, setContactForm] = useState<ContactFormProps>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const formData = query.get('formData');
    if (formData) {
      setFormInput(JSON.parse(formData));
    }
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formInput,
      ...contactForm,
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Data submitted successfully!');
      } else {
        alert('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Contact Information</h1>
      <div className={styles.inputRow}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={contactForm.firstName}
          onChange={handleContactChange}
          className={styles.input}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={contactForm.lastName}
          onChange={handleContactChange}
          className={styles.input}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={contactForm.email}
          onChange={handleContactChange}
          className={styles.input}
        />
      </div>
      <div className={styles.inputRow}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={contactForm.phoneNumber}
          onChange={handleContactChange}
          className={styles.input}
        />
      </div>
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
    </div>
  );
}
