import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LyricsView({ track, artist }) {
  const [lyrics, setLyrics] = useState('');

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

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{track} By {artist}</h1>
      <pre className="bg-songblockbackground rounded-xl max-h-[65vh] overflow-y-auto px-8 py-4 w-3/4">
        {lyrics}
      </pre>
      <button className='buttonStyle'>Add to Songs</button>
    </div>
  );
}