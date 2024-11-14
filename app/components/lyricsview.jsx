'use client';
import React, { useEffect, useState } from 'react';
import { fetchLyrics } from '../api/lyrics/route'; // Import fetchLyrics

export default function LyricsView({ track, artist }) {
  const [lyrics, setLyrics] = useState('');
  const [isLoading, setIsLoading] = useState(false)

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
    </div>
  );
}