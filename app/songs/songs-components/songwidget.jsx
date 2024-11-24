'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SongWidget({ id, track, artist, deleteSong }) {
    const router = useRouter();

    function handleSongClick(trackName, artistName) {
        const query = `track=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artistName)}`;
        router.push(`/lyricsview?${query}`);
    };

    function handleDeleteClick(e) {
        e.stopPropagation(); // Stops the event (the click) from bubbling up to the parent elements.
        deleteSong(id);
    };

    return (
        <div
            className="p-4 bg-songblockbackground hover:bg-zinc-900 transition-colors duration-500 cursor-pointer rounded-xl flex items-center space-x-4"
            onClick={() => handleSongClick(track, artist)}
        >
            <Image src="/music.png" alt="Music Icon" width={100} height={100} />
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{track}</h2>
                <p className="text-gray-600">{artist}</p>
            </div>
            <button
                className="text-pink-500 p-2 rounded bg-navbackground"
                onClick={handleDeleteClick}
            >
                X
            </button>
        </div>
    );
}