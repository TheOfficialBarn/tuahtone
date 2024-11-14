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
    const retrieveLyrics = async () => {
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
    setIsLoading(true);

    await fetch('../api/completion', {
      method: 'POST',
      body: JSON.stringify({prompt: `Give me a comma separated list of words/unconjugated verbs that a language learner needs to understand this song based on these lyrics: ${lyrics}`,}),
    }).then(response => {
      response.json().then(json => {
        setIsLoading(false);
        console.log(json.text)
      });
    });
  }
  
  const handleAddSong = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to add songs.' });
      return;
    }

    try {
      const songsRef = collection(db, 'users', user.uid, 'songs');
      await addDoc(songsRef, { name: track, artist });
      setMessage('Song added successfully!');
    } catch (err) {
      console.error("Error adding song:", err);
      setMessage('Failed to add song.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-songblockbackground rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 w-3/4">
        {lyrics}
      </pre>
      <button className='buttonStyle' onClick={aiLyricsToFirebase}>
        Add to Songs
      </button>
      <p>{isLoading ? "Loading..." : ""}</p>

      <button onClick={handleAddSong} className='buttonStyle'>Add to Songs</button>
      <p className="text-red-500">{message}</p>
    </div>
  );
}
