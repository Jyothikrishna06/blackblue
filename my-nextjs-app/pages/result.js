import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

// Function to jumble the letters of a single word, leaving the first and last letters in place.
const jumbleWord = (word) => {
  // If the word is too short to jumble, return it as is.
  if (word.length <= 3) {
    return word;
  }
  
  const firstLetter = word[0];
  const lastLetter = word[word.length - 1];
  const middleLetters = word.slice(1, -1).split('');
  
  // Shuffle the middle letters using the Fisher-Yates algorithm.
  for (let i = middleLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middleLetters[i], middleLetters[j]] = [middleLetters[j], middleLetters[i]];
  }
  
  return firstLetter + middleLetters.join('') + lastLetter;
};

export default function Result() {
  const router = useRouter();
  const [jumbledText, setJumbledText] = useState('');

  useEffect(() => {
    if (router.isReady) {
      // Get the text from the URL query parameter.
      const { text: textFromQuery } = router.query;
      if (textFromQuery) {
        const text = decodeURIComponent(textFromQuery);
        const words = text.split(/\s+/);
        const jumbledWords = words.map(word => jumbleWord(word));
        const jumbledText = jumbledWords.join(' ');
        setJumbledText(jumbledText);
      }
    }
  }, [router.isReady, router.query]);

  return (
    <div className={styles.container}>
      <div className={styles.resultContainer}>
        <h1 className={styles.resultHeading}>Jumbled Text</h1>
        <p className={styles.resultText}>{jumbledText}</p>
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
