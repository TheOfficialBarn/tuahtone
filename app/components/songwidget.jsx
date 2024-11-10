'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function SongWidget({ track, artist }) {
    const router = useRouter();

    const handleSongClick = (trackName, artistName) => {
        const query = `track=${encodeURIComponent(trackName)}&artist=${encodeURIComponent(artistName)}`;
        router.push(`/lyricsview?${query}`);
    };

    return (
        <div
            className="p-4 bg-songblockbackground rounded-xl flex items-center space-x-4"
            onClick={() => handleSongClick(track, artist)}
        >
            <Image src="/music.png" alt="Music Icon" width={100} height={100} />
            <div className="flex-1">
				
                <h2 className="text-lg font-semibold">{track}</h2>
                <p className="text-sm text-gray-500">{artist}</p>
            </div>
        </div>
    );
}