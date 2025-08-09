import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Choose() {
  const [userName, setUserName] = useState('Guest');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chooseContainer}>
        <h2 className={styles.greetingHeading}>Hello {userName}</h2>
        <div className={styles.buttonGroup}>
          <button
            className={styles.chooseBtn}
            onClick={() => router.push('/text')}
          >
            Enter Text
          </button>
        </div>
      </div>
    </div>
  );
}