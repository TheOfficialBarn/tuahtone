'use client';
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

export default function Search() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const timeoutRef = useRef(null);
	const router = useRouter();

	function handleSongClick(track, artist, imageURL) {
		const query = `track=${encodeURIComponent(track)}&artist=${encodeURIComponent(artist)}&image=${encodeURIComponent(imageURL)}`;
		router.push(`/lyricsview?${query}`);
	};

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
		<div className="w-full border-b border-slate-700">
				<div className="relative">
					<input
						type="text"
						placeholder="Search for your favorite song..."
						className="p-4 pl-12 rounded-xl bg-slate-800 w-full caret-gold focus:outline-none focus:ring-2 focus:ring-gold duration-300"
						value={query}
						onChange={handleSearch}
					/>
					<div className="absolute left-4 top-1/2 -translate-y-1/2">
						<Image 
							src="/search.svg" 
							width={20} 
							height={20} 
							alt="search"
						/>
					</div>
				</div>
			<ul className="mt-4">
				{results.map((track) => (
					<li 
						key={track.id} 
						className="flex items-center text-white p-2 border-b border-slate-700 hover:bg-slate-700 hover:bg-opacity-20 transition-colors duration-300"
						onClick={() => handleSongClick(track.name, track.artists[0].name, track.album.images[2]?.url || track.images[0]?.url)}
					>
						<Image
							src={track.album.images[2]?.url || track.album.images[0]?.url} // Use smallest image if available
							alt={`${track.name} album art`}
							height={75}
							width={75}
							className="mr-4 rounded-md"
						/>
						<div>
							<p className="font-medium">{track.name}</p>
							<p className="text-sm text-gray-400">
								{track.artists.map((artist) => artist.name).join(', ')}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
