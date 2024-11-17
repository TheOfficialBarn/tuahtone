'use client';
import React, { useEffect, useState } from 'react';
import { fetchLyrics } from '../api/lyrics/route'; // Import fetchLyrics
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function LyricsView({ track, artist }) {
  const { user } = useAuth();
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function retrieveLyrics() {
      try {
        const fetchedLyrics = await fetchLyrics(track, artist);
        setLyrics(fetchedLyrics); //This is a state updater function used to update tyhe lyrics state variable
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    retrieveLyrics();
  }, [track, artist]);

  async function aiLyricsToFirebase() {
    if (!user) {
      setMessage('You must be logged in to save flashcards.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('../api/completion', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `Give me ONLY (and nothing else) a comma separated list of words/unconjugated verbs that a language learner needs to understand this song based on these lyrics: ${lyrics}`,
        }),
      });

      const json = await response.json();
      const keywords = json.text.split(',').map(word => word.trim());

      const flashcardsCollection = collection(db, 'users', user.uid, 'flashcards');
      
      for (const word of keywords) {
        await addDoc(flashcardsCollection, { word, timestamp: new Date() });
      }

      console.log("Keywords saved to Firebase:", keywords);
    } catch (error) {
      console.error("Error saving keywords to Firebase:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function handleAddSong() {
    if (!user) {
      setMessage('You must be logged in to add songs.');
    } else {
      try {
        const songsRef = collection(db, 'users', user.uid, 'songs');
        await addDoc(songsRef, { name: track, artist });
        setMessage('Song added successfully!');
      } catch (err) {
        console.error("Error adding song:", err);
        setMessage('Failed to add song.');
      }
    }
  }

  function handleBoth() {
    aiLyricsToFirebase();
    handleAddSong();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-songblockbackground rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 md:w-5/6 w-11/12">
        {lyrics}
      </pre>
      <button onClick={handleBoth} className='buttonStyle'>Add to Songs</button>
      <p className="text-red-500">{message}</p>
      <p>{isLoading ? "Loading..." : ""}</p>
    </div>
  );
}
