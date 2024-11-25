'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import SongWordsWidget from './songwords-widget';

export default function SongWords({ updateFlashcards }) {
    const { user, loading } = useAuth();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (!loading && user) {
            async function fetchSongsAndWords() {
                try {
                    const songsCollectionRef = collection(db, 'users', user.uid, 'songs');
                    const songsSnapshot = await getDocs(songsCollectionRef);
                    
                    // Fetch songs and their flashcards
                    const songsWithWordsPromises = songsSnapshot.docs.map(async songDoc => {
                        const flashcardsRef = collection(db, 'users', user.uid, 'songs', songDoc.id, 'flashcards');
                        const flashcardsSnapshot = await getDocs(flashcardsRef);
                        const flashcards = flashcardsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        return {
                            id: songDoc.id,
                            ...songDoc.data(),
                            flashcards: flashcards
                        };
                    });

                    const songsWithWords = await Promise.all(songsWithWordsPromises);
                    setSongs(songsWithWords);
                } catch (err) {
                    console.error("Error fetching songs:", err);
                }
            }

            fetchSongsAndWords();
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
                            imageURL={song.imageURL}
                            onClick={() => updateFlashcards(song.flashcards)}
                        />
                    ))}
                </div>
            ) : (
                <p>No songs added yet.</p>
            )}
        </section>
    );
}