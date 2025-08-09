import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Loading() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 5000;
    const interval = 50;
    const steps = totalTime / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Redirect directly to the text entry page
        router.push('/text');
      }
    }, interval);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className={`${styles.container} ${styles.loadingBackground}`}>
      <div className={styles.progressBarContainer}>
        <div
          className={`${styles.progressBarFill} ${styles.animateFill}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}