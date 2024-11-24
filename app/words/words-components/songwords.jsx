'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import SongWordsWidget from './songwords-widget';


export default function SongWords({ setScrollingVocab }) {
	const { user, loading } = useAuth();
	const [songs, setSongs] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!loading && user) {
			async function fetchSongs() {
				try {
					const songsCollectionRef = collection(db, 'users', user.uid, 'songs');
					const songsSnapshot = await getDocs(songsCollectionRef);
					const songsList = songsSnapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data()
					}));
					setSongs(songsList);
				} catch (err) {
					console.error("Error fetching songs:", err);
					setError('Failed to load songs.');
				}
			}

			fetchSongs();
		}
	}, [user, loading]);

	return(
		<section>
			{songs.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
					{songs.map(song => (
						<SongWordsWidget
							key={song.id}
							track={song.name}
							artist={song.artist}
							onclick={() => console.log("Click")}
						/>
					))}
				</div>
			) : (
				<p>No songs added yet.</p>
			)}
		</section>
	)
}