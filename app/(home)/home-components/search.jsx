'use client';
import { useState, useRef } from "react";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);

	async function getAccessToken() {
		try {
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
		} catch (e) {
			console.error("In 'getAccessToken':", e);
		}
	};

  async function handleSearch(e) {
	const value = e.target.value;
	setQuery(value);

	// Clear previous timeout
	if (timeoutRef.current) {
		clearTimeout(timeoutRef.current);
	}

	if (value.length > 2) {
		// Set new timeout
		timeoutRef.current = setTimeout(async () => {
		const token = await getAccessToken()
		const response = await fetch(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(value)}&type=track&limit=5`,
			{
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		setResults(data.tracks?.items || []);
		}, 300);
	} else {
		setResults([]);
	}
  }

	return (
	<div className="w-full">
		<input
			type="text"
			placeholder="Search for your favorite song..."
			className="p-4 rounded-xl bg-zinc-700 w-full caret-rose-400 focus:outline-none focus:ring-2 focus:ring-profileButton"
			value={query}
			onChange={handleSearch}
		/>
		<ul className="mt-4">
		{results.map((track) => (
			<li key={track.id} className="text-white p-2 border-b border-gray-700">
				{track.name} by {track.artists.map((artist) => artist.name).join(', ')}
			</li>
		))}
		</ul>
	</div>
	);
}
