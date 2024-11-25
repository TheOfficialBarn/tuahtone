'use client';

import { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/app/lib/firebase';
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
  const formRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogin(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  async function handleSignUp(email, password) {
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

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  function handleSubmit(e, email, password) {
    e.preventDefault();
    if (isLogin) {
      handleLogin(email, password);
    } else {
      handleSignUp(email, password);
    }
  };

  const triggerFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {!user ? (
        <>
          <h1 className="mb-5">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          <AuthForm
            ref={formRef}
            isLogin={isLogin}
            onSubmit={handleSubmit}
            error={error}
            setLanguage={setLanguage}
          />
          <div className="flex gap-2 mt-2">
            <button onClick={() => setIsLogin(!isLogin)} className="buttonStyle w-[145px] secondaryButton">
              {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
            <button 
              type="button" 
              onClick={triggerFormSubmit}
              className="buttonStyle w-[145px]"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className='mt-4'>Hi {user.email}!</h1>
          <p className='mb-4'>Thank you for using TuahTone!</p>
          <button onClick={handleLogout} className='buttonStyle secondaryButton'>Logout</button>
        </>
      )}
    </section>
  );
}