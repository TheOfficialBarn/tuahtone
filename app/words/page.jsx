"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import BigFlashCard from './words-components/bigflashcard';
import SongWords from './words-components/songwords';

export default function Page() {
  const { user, loading } = useAuth();
  const [flashcards, setCard] = useState([]);
  const [error, setError] = useState(null);

  // Add function to update flashcards
  const updateFlashcards = (newFlashcards) => {
    setCard(newFlashcards);
  };

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
          setError(err.message);
          console.error("Error fetching flashcards:", err);
        }
      }
      fetchAllFlashcards();
    }
  }, [user, loading]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <h1>Sign in to view Words</h1>;

  return (
    <section>
      <h1>Words</h1>
      <BigFlashCard wordsObjArray={flashcards} />

      <Link href="words/wordslibrary" className="bg-songblockbackground rounded-xl p-6 cursor-pointer block my-4">
        Words Library ➡️
      </Link>

      <SongWords updateFlashcards={updateFlashcards}/> {/* Pass the function */}
    </section>
  );
}
