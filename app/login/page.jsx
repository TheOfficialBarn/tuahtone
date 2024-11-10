"use client";

import { useState, useEffect } from 'react';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import localFont from 'next/font/local';

const jetBrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jet-brains-mono",
  weight: "100 900",
});

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState(''); // Add state for language
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

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
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user information to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        language: language
      });

      // Initialize the 'songs' subcollection (optional: add initial songs)
      const songsCollectionRef = collection(db, 'users', user.uid, 'songs');
      
      // Example: Adding an initial song (optional)
      // await addDoc(songsCollectionRef, {
      //   name: 'Sample Song',
      //   artist: 'Sample Artist'
      // });

      // Redirect to login page after successful sign-up
      router.push('/login');
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after logout
      router.push('/login');
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(''), 5000);
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

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px'
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
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-songblockbackground rounded-xl p-2 col-span-1"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        {!isLogin && (
          <>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-songblockbackground rounded-xl p-2 col-span-1"
              style={inputStyle}
            >
              <option value="" disabled>Select your language</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              {/* Add more languages as needed */}
            </select>
            <button type="submit" style={buttonStyle}>Sign Up</button>
          </>
        )}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)} style={buttonStyle}>
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
      {isLogin && user && <button onClick={handleLogout} style={buttonStyle}>Logout</button>}
      {user && <p style={{ marginTop: '20px' }}>Logged in as: {user.email}</p>}
    </section>
  );
}
