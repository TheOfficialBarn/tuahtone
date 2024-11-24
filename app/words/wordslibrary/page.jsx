"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Flashcard from '../words-components/flashcard';

export default function Page() {
  const { user, loading } = useAuth();
  const [flashcards, setCard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) {
      async function fetchAllFlashcards() {
        try {
          // First get all songs
          const songsRef = collection(db, 'users', user.uid, 'songs');
          const songsSnapshot = await getDocs(songsRef);
          
          // For each song, get its flashcards
          const allFlashcardsPromises = songsSnapshot.docs.map(async songDoc => {
            const flashcardsRef = collection(db, 'users', user.uid, 'songs', songDoc.id, 'flashcards');
            const flashcardsSnapshot = await getDocs(flashcardsRef);
            return flashcardsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          });

          // Wait for all flashcards to be fetched
          const allFlashcardsArrays = await Promise.all(allFlashcardsPromises);
          // Flatten array of arrays into single array
          const allFlashcards = allFlashcardsArrays.flat();
          setCard(allFlashcards);
        } catch (err) {
          console.error("Error fetching flashcards:", err);
          setError("Failed to load flashcards");
        }
      }
      fetchAllFlashcards();
    }
  }, [user, loading]);

  if (loading) return <p>loading...</p>;

  if (!user) return <h1>Sign in to view Words</h1>;

  return (
    <section>
      <h1>Words Library</h1>
      {error && <p className='text-red-500'>{error}</p>}
      {flashcards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {flashcards.map(card => (
            <Flashcard
              key={card.id}
              word={card.word}
              className="bg-songblockbackground rounded-xl"
            />
          ))}
        </div>
      ) : (
        <p>No words added yet.</p>
      )}
    </section>
  );
}
