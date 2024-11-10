'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const clientId = '86f0ed8961d4461597f4ccc7da0ce691';
const clientSecret = '95453bb100d44dfaaa862fffae3f7d83';

export default function SongsBlock({ playlistId, language, flag }) {
    const [tracks, setTracks] = useState([]);
    const [lyrics, setLyrics] = useState({}); // Store lyrics for each track

    useEffect(() => {
        const getAccessToken = async () => {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
                },
                body: 'grant_type=client_credentials'
            });

            const data = await response.json();
            return data.access_token;
        };

        const fetchTracks = async () => {
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setTracks(data.items.map(item => item.track));
        };

        fetchTracks();
    }, [playlistId]);

    // Fetch lyrics for a specific track
    const fetchLyrics = async (track, artist) => {
        try {
            const response = await axios.get(`https://lyrist.vercel.app/api/${track}/${artist}`);
            setLyrics(prevLyrics => ({ ...prevLyrics, [track]: response.data.lyrics }));
        } catch (error) {
            console.error("Error fetching lyrics:", error);
        }
    };

    return (
        <div className="p-16 bg-songblockbackground rounded-xl">
            <h2 className='mb-8 flex justify-center'>Top 10 {language} Songs {flag}</h2>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index} className='text-center hover:text-orange-500 transition-colors duration-300'>
                        <div onClick={() => fetchLyrics(track.name, track.artists[0].name)}>
                            {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                        </div>
                        {lyrics[track.name] && <pre>{lyrics[track.name]}</pre>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
