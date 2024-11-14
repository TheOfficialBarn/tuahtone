"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import SongWidget from "../components/songwidget";

export default function Page() {
    const { user, loading } = useAuth();
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading && user) {
            const fetchSongs = async () => {
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
            };

            fetchSongs();
        }
    }, [user, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Please log in to view your songs.</p>;
    }

    return (
        <section>
            <h1>Songs</h1>
            {error && <p className="text-red-500">{error}</p>}
            {songs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    {songs.map(song => (
                        <SongWidget key={song.id} track={song.name} artist={song.artist} />
                    ))}
                </div>
            ) : (
                <p>No songs added yet.</p>
            )}
        </section>
    );
}
