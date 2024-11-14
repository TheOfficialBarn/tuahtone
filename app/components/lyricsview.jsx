import React, { useEffect, useState } from 'react';
import { fetchLyrics } from '../api/lyrics/route'; // Import fetchLyrics

export default function LyricsView({ track, artist }) {
  const [lyrics, setLyrics] = useState('');

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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-songblockbackground rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 w-3/4">
        {lyrics}
      </pre>
      <button className='buttonStyle'> {/*Handle Here*/}
        Add to Songs
      </button>
    </div>
  );
}