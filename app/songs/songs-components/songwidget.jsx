'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SongWidget({ id, track, artist, imageURL, deleteSong }) {
    const router = useRouter();

    function handleSongClick(trackName, artistName, imageURL) {
        const query = `track=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artistName)}&image=${encodeURI(imageURL)}`;
        router.push(`/lyricsview?${query}`);
    };

    function handleDeleteClick(e) {
        e.stopPropagation(); // Stops the event (the click) from bubbling up to the parent elements.
        deleteSong(id);
    };

    return (
        <div
            className="p-4 bg-blue hover:bg-darkBlue transition-colors duration-300 cursor-pointer rounded-xl flex items-center space-x-4"
            onClick={() => handleSongClick(track, artist, imageURL)}
        >
            <Image src={imageURL} alt="album art" width={100} height={100} className="rounded-md" />
            <div className="flex-1">
                <h2 className="text-lg font-semibold">{track}</h2>
                <p className="text-gray-600">{artist}</p>
            </div>
            <button
                className="text-red-800 p-2 rounded-full bg-darkBlue"
                onClick={handleDeleteClick}
            >
                <Image src="/trash.svg" alt="trash" width={20} height={20}/>
            </button>
        </div>
    );
}