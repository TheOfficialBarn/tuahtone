'use client';
import React, { useEffect, useState } from 'react';

const clientId = '86f0ed8961d4461597f4ccc7da0ce691';
const clientSecret = '95453bb100d44dfaaa862fffae3f7d83';

export default function SongsBlock({ playlistId, language, flag }) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        // Function to get access token
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

        // Function to fetch playlist tracks
        const fetchTracks = async () => {
            const token = await getAccessToken();

            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setTracks(data.items.map(item => item.track)); // Extract track information from items
        };

        fetchTracks();
    }, [playlistId]); // Re-run effect if playlistId changes

    return (
		<div className="p-16 bg-songblockbackground rounded-xl">
			<h2 className='mb-2'>Top 10 {language} Songs {flag}</h2>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index}>
                        {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                    </li>
                ))}
            </ul>
		</div>
    );
};