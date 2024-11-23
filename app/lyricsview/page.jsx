'use client';
import { useSearchParams } from 'next/navigation';
import LyricsView from "./lyricsview-components/lyricsview";

export default function Page() {
    const searchParams = useSearchParams();
    const track = searchParams.get('track');
    const artist = searchParams.get('artist');

    return (
        <div>
            <LyricsView track={track} artist={artist}/>
        </div>
    );
}