"use client";
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Flashcard from '../components/flashcard';

export default function Page() {
  const { user } = useAuth();

  return (
    <section>
      {user ? (
    <>
      <h1>Welcome to Words, {user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 style={{overflow: 'visible' }}">
        <Flashcard/>
        <Flashcard/>
        <Flashcard/>
        <Flashcard/>
        <Flashcard/>
      </div>
    </>
      ) : (
        <>
          <h1>Log In to access Words</h1>
        </>
      )}
    </section>
  );
}
