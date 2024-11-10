"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import SongWidget from "../components/songwidget";
import localFont from 'next/font/local';

// ... your font setup ...

export default function Page() {
  const { user } = useAuth();
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userDocRef, setUserDocRef] = useState(null);

  useEffect(() => {
    const fetchUserDoc = async () => {
      if (user) {
        try {
          // Log the user's UID
          console.log('Authenticated user UID:', user.uid);

          // Query the 'users' collection for a document with 'uid' equal to user.uid
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // Assuming there's only one document per user
            const userDoc = querySnapshot.docs[0];
            setUserDocRef(userDoc.ref); // Set the reference to the user's document
            console.log('User document found:', userDoc.data());
          } else {
            setError('User document not found.');
            console.error('No user document matches the UID:', user.uid);
          }
        } catch (err) {
          console.error('Error fetching user document:', err);
          setError('Error fetching user document.');
        }
      }
    };

    fetchUserDoc();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to add a song.');
      return;
    }

    if (!userDocRef) {
      setError('User document not found.');
      return;
    }

    try {
      // Reference to the 'songs' subcollection within the user's document
      const userSongsCollectionRef = collection(userDocRef, 'songs');

      // Add a new document to the 'songs' subcollection
      await addDoc(userSongsCollectionRef, {
        songName,
        artistName,
      });

      setSuccess('Song added successfully!');
      setSongName('');
      setArtistName('');
    } catch (err) {
      setError('Failed to add song.');
      console.error('Error adding song:', err);
    }
  };

  return (
    <section
      style={{
        fontFamily: 'var(--font-jet-brains-mono)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Songs</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <SongWidget />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <input
          type="text"
          placeholder="Song Name"
          className="bg-songblockbackground rounded-xl p-2 col-span-1"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Artist Name"
          className="bg-songblockbackground rounded-xl p-2 col-span-1"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
        />
        <button type="submit">Add Song</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </section>
  );
}
