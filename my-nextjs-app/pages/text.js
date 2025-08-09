import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Text() {
  const [text, setText] = useState('');
  const router = useRouter();

  const handleNext = () => {
    // Navigate to the new choice page with the entered text as a query parameter.
    router.push(`/text-choice?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.textHeading}>Enter Your Text</h1>
        <textarea
          className={styles.textArea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
        />
        <button className={styles.jumbleBtn} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}