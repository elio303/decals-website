'use client';

import styles from '@/app/confirmation/page.module.css';
export default function ConfirmationPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Thank You for Your Submission!</h1>
      <p className={styles.message}>
        We have received your details. Our team will review your order, and you can expect a follow-up via email or phone shortly.
      </p>
      <p className={styles.footer}>
        If you have any further questions, feel free to contact us at <strong>support@3dbumpers.com</strong>.
      </p>
    </div>
  );
}
