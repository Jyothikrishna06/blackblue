import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function TextChoice() {
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const { text: textFromQuery } = router.query;
      if (textFromQuery) {
        setText(decodeURIComponent(textFromQuery));
      }
    }
  }, [router.isReady, router.query]);

  const handleJumble = () => {
    router.push(`/result?text=${encodeURIComponent(text)}`);
  };

  const handleCount = () => {
    router.push(`/count?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.choiceContainer}>
        <h1 className={styles.textHeading}>Choose an Option</h1>
        <div className={styles.buttonGroup}>
          <button className={styles.chooseBtn} onClick={handleJumble}>
            Jumble Words
          </button>
          <button className={styles.chooseBtn} onClick={handleCount}>
            Count Words
          </button>
        </div>
      </div>
    </div>
  );
}