import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function LyricsView({ track, artist }) {
  const { user } = useAuth();
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.get(`https://lyrist.vercel.app/api/${track}/${artist}`);
        setLyrics(response.data.lyrics);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, [track, artist]);

  const handleAddSong = async () => {
    if (!user) {
      setError('You must be logged in to add songs.');
      return;
    }

    try {
      const songsRef = collection(db, 'users', user.uid, 'songs');
      await addDoc(songsRef, { name: track, artist });
      setSuccess('Song added successfully!');
      setError('');
    } catch (err) {
      console.error("Error adding song:", err);
      setError('Failed to add song.');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-songblockbackground rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 w-3/4">
        {lyrics}
      </pre>
      <button onClick={handleAddSong} className='buttonStyle'>Add to Songs</button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
