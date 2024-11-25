'use client';
import React, { useEffect, useState } from 'react';
import { fetchLyrics } from '@/app/api/lyrics/route';
import { useAuth } from '@/app/context/AuthContext';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import LyricLine from './lyricline';

export default function LyricsView({ track, artist, imageURL }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [lyricsArr, setLyricsArr] = useState([]);
  const [lyrics, setLyrics] = useState("");
  
  useEffect(() => {
    async function retrieveLyrics() {
      try {
        const fetchedLyrics = await fetchLyrics(track, artist);
        if(!fetchedLyrics) {
          setLyricsArr(["No lyrics found."]);
        } else {
          setLyrics(fetchedLyrics);
          setLyricsArr(fetchedLyrics.split("\n").map(line => line.trim())); // Turn fetchedLyrics into an array
        }

      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    retrieveLyrics();
  }, [track, artist]); // Included array as parameter means you want the function to run everytime these variables change

  async function addToLibrary() {
    setIsLoading(true);
    if (!user) {
      alert("You must be logged in to save this song.");
      return;
    }
    
    try {
      const songsRef = collection(db, 'users', user.uid, 'songs');
      const q = query(songsRef, where('name', '==', track), where('artist', '==', artist));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert("Song already added");
        return;
      }

      const songDoc = await addDoc(songsRef, { 
        name: track, 
        artist,
        imageURL,
        timestamp: new Date()
      });

      setTimeout(() => {
        setMessage("Adding lyrics...");
      }, 1000);

      const response = await fetch('../api/completion', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `Give me ONLY (and nothing else) a comma separated list of words/unconjugated verbs that a language learner needs to understand this song based on these lyrics: ${lyrics}`,
        }),
      });
      const json = await response.json();
      const keywords = json.text.split(',').map(word => word.trim());

      // Add flashcards as subcollection of the song
      const flashcardsCollection = collection(db, 'users', user.uid, 'songs', songDoc.id, 'flashcards');
      for (const word of keywords) {
        await addDoc(flashcardsCollection, { word, timestamp: new Date() });
      }

      setTimeout(() => {
        setMessage("Song and words added successfully!")
      }, 3000);
    } catch (error) {
      console.error("Error saving song and keywords:", error);
      setMessage('Failed to add song and words.');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-blue rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 md:w-5/6 w-11/12">
        {lyricsArr.length > 0 ? (
          lyricsArr.map((line, index) => (
            <LyricLine 
              key={index}
              line={line}
            />
            
          ))
        ) : (
          <p>Loading...</p>
        )}
      </pre>
      {/* Below is a logical operator thing that if the condition on the left is true the right executes.
          The opposite of this is ||. In this the right side executes only if the left side is false.
      */}
      {(lyricsArr[0] !== "No lyrics found." && lyricsArr.length !== 0) && <button onClick={addToLibrary} className='buttonStyle'>Add to Songs</button>}
      <p>{isLoading ? message : ""}</p>
    </section>
  );
}
