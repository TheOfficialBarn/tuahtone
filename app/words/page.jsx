"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Flashcard from '../components/flashcard';

export default function Page() {
  const { user, loading } = useAuth();
  const [flashcards, setCard] = useState([]);
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && user) {
      async function fetchCards() {
        try{
          const cardsCollectionRef = collection(db, 'users', user.uid, 'flashcards');
          const cardsSnapshot = await getDocs(cardsCollectionRef);
          const cardsList = cardsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setCard(cardsList);
        } catch (err) {
          console.error("Error fetching flashcards", err);
          setError("Failed to load flashcards");
        }
      }
      fetchCards(); 
    }
  }, [user, loading]);

  if (loading) return <p>loading...</p>;

  if (!user) return <h1>Sign in to view Words</h1>

  return (
    <section>
      <h1>Welcome to Words</h1>
      {error && <p className='text-red-500'>{error}</p>}
      {flashcards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {flashcards.map(card => (
            <Flashcard key={card.id} word={card.word}/>
          ))}
        </div>
      ) : (
        <p>No words added yet.</p>
      )}
    </section>
  );
}
