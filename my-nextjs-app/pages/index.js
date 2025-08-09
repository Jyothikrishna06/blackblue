import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', name);
    router.push('/loading');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginHeading}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}