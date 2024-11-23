'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

export default function SongsBlock({ playlistId, language, flag }) {
	const [tracks, setTracks] = useState([]);
	const router = useRouter();

	function handleSongClick(track, artist) {
		const query = `track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}`;
		router.push(`/lyricsview?${query}`);
	};

	useEffect(() => {
		async function getAccessToken() {
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

		async function fetchTracks() {
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

	return (
		<div className="p-16 bg-songblockbackground rounded-xl h-full flex-col">
			<h2 className='flex justify-center'>Top 10 {language} Songs {flag}</h2>
			<ul>
				{tracks.map((track, index) => (
					<li key={index} className='text-center hover:text-orange-500 transition-colors duration-300'>
						<div onClick={() => handleSongClick(track.name, track.artists[0].name)}>
						{track.name} by {track.artists[0].name}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}