'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import AuthForm from './authform';

export default function AuthContainer() {
  const [language, setLanguage] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleSignUp = async (email, password) => {
    if (!language) {
      setError('Please select a language.');
      setTimeout(() => setError(''), 5000);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        uid: user.uid,
        language: language
      });
      router.push('/login');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(email, password);
    } else {
      handleSignUp(email, password);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {!user ? (
        <>
          <h1 className="mb-5">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          <AuthForm
            isLogin={isLogin}
            onSubmit={handleSubmit}
            error={error}
            setLanguage={setLanguage}
          />
          <button onClick={() => setIsLogin(!isLogin)} className="buttonStyle mt-2">
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </>

      ) : (
        <>
          <h1 className='mt-4'>Hi @{user.email}!</h1>
          <p className='my-4'>Thank you for using TuahTone!</p>
          <p><small>Support our development! @theofficialbarn on Venmo</small></p>
          <button onClick={handleLogout} className='buttonStyle'>Logout</button>
        </>
      )}
    </section>
  );
}