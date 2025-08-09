import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Count() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [target, setTarget] = useState('');
  const [targetCount, setTargetCount] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { text: textFromQuery } = router.query;
      if (textFromQuery) {
        const decodedText = decodeURIComponent(textFromQuery);
        setText(decodedText);
        // Split by whitespace and filter out empty strings to get an accurate count
        const words = decodedText.split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
      }
    }
  }, [router.isReady, router.query]);
  
  const handleCountTarget = () => {
    if (!target) {
      setTargetCount(0);
      return;
    }
    
    // Normalize target and text to lowercase for case-insensitive search
    const normalizedText = text.toLowerCase();
    const normalizedTarget = target.toLowerCase();
    
    let count = 0;
    // Check if the target is a single letter
    if (normalizedTarget.length === 1) {
      for (let i = 0; i < normalizedText.length; i++) {
        if (normalizedText[i] === normalizedTarget) {
          count++;
        }
      }
    } else {
      // It's a word, so count occurrences
      const words = normalizedText.split(/\s+/);
      count = words.filter(word => word === normalizedTarget).length;
    }
    setTargetCount(count);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        <h1 className={styles.resultHeading}>Word Count</h1>
        <p className={styles.totalCountText}>Total words: {wordCount}</p>
        
        <div className={styles.targetCountContainer}>
          <input 
            type="text"
            className={styles.targetInput}
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter word or letter to count"
          />
          <button className={styles.countTargetBtn} onClick={handleCountTarget}>
            Count
          </button>
          {targetCount !== null && (
            <p className={styles.targetResultText}>
              The word/letter &quot;{target}&quot; appears {targetCount} time(s).
            </p>
          )}
        </div>

        <button
          className={styles.backBtn}
          onClick={() => router.push('/text')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}