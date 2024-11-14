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
  const [isLogin, setIsLogin] = useState(false);
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
  if (!language) {
    setError('Please select a language.');
    setTimeout(() => setError(''), 5000);
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user information to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      uid: user.uid,
      language: language
    });

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

  return (
    <section className={`${jetBrainsMono.variable} flex flex-col items-center justify-center`}>
      <h1 className="mb-5">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="username"
          className="bg-songblockbackground rounded-md p-2.5 mb-2.5 w-full max-w-[300px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-songblockbackground rounded-md p-2.5 mb-2.5 w-full max-w-[300px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit(e);
            }
          }}
        />
        {isLogin && (
          <button type="submit" className="buttonStyle">Login</button>
        )}
        {!isLogin && (
          <>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none w-full bg-[#2c2e31] border-2 border-[#646669] text-[#ffcba4] py-2 px-4 pr-8 rounded-md focus:outline-none focus:border-[#ffcba4] hover:border-[#ffcba4] transition-colors"
              defaultValue=""
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
            <button type="submit" className="buttonStyle">Create Account</button>
          </>
        )}
      </form>
      {error && <p className='text-red-600'>{error}</p>}
      <button onClick={() => setIsLogin(!isLogin)} className="buttonStyle">
        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
      </button>
      {isLogin && user && <button onClick={handleLogout} className='buttonStyle'>Logout</button>}
      {user && (
        <>
          <p className='mt-4'>Logged in as: {user.email}</p>
        </>
      )}
    </section>
  );
}
