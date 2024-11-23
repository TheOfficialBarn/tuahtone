"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import SongWidget from "./songs-components/songwidget";

export default function Page() {
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

    const deleteSong = async (id) => {
        try {
            const songDoc = doc(db, 'users', user.uid, 'songs', id);
            await deleteDoc(songDoc);
            setSongs(songs.filter(song => song.id !== id));
        } catch (err) {
            console.error("Error deleting song:", err);
            setError('Failed to delete song.');
        }
    };

    if (loading) {
        return <p>loading...</p>;
    }

    if (!user) {
        return <h1>Sign in to view Songs</h1>;
    }

    return (
        <section>
            <h1>Songs</h1>
            {error && <p className="text-red-500">{error}</p>}
            {songs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mb-4">
                    {songs.map(song => (
                        <SongWidget
                            key={song.id}
                            id={song.id}
                            track={song.name}
                            artist={song.artist}
                            deleteSong={deleteSong}
                        />
                    ))}
                </div>
            ) : (
                <p>No songs added yet.</p>
            )}
        </section>
    );
}
