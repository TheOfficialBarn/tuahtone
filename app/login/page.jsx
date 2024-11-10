"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // adjust the path as needed
import localFont from 'next/font/local';

const jetBrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jet-brains-mono",
  weight: "100 900",
});

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to a different page or show success message
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to login page after successful sign-up
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after logout
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  const buttonStyle = {
    padding: '5px 20px',
    fontSize: '16px',
    margin: '10px 0',
    cursor: 'pointer',
    backgroundColor: '#2D3240',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  return (
    <section style={{ fontFamily: 'var(--font-jet-brains-mono)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="username"
          className="bg-songblockbackground rounded-xl p-2 col-span-1"
          style={{ marginBottom: '10px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-songblockbackground rounded-xl p-2 col-span-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)} style={buttonStyle}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
      <button onClick={handleLogout} style={buttonStyle}>Logout</button>
      {user && <p style={{ marginTop: '20px' }}>Logged in as: {user.email}</p>}
    </section>
  );
}
