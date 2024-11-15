import Link from 'next/link';
import SongsBlock from "./components/songsblock";

export default function Home(){
    return(
    <section>
        <h1>Home</h1>
        {/*The grid makes the layout a grid. Grid-cols-1 means by default use 1 column. sm:grid-cols-2 means on small screens and above use two columns. Lg:grid-cols-3 means on large screens and above use 3 columns. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <SongsBlock language="Spanish" flag="🇲🇽" playlistId="37i9dQZEVXbO3qyFxbkOE1"/>
            <SongsBlock language="English" flag="🇺🇸" playlistId="37i9dQZEVXbLRQDuF5jeBp"/>
            <div className="sm:col-span-2 lg:col-span-1 h-full">
                <SongsBlock
                    language="French"
                    flag="🇫🇷"
                    playlistId="37i9dQZEVXbIPWwFssbupI"
                    className="h-full"
                />
            </div>
            <Link href="/morelanguages" className="bg-songblockbackground rounded-xl p-6 col-span-full no-underline cursor-pointer">More Languages ➡️</Link>
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl p-1 col-span-full">
                <Link href="/language-chat" className="bg-songblockbackground rounded-xl p-6 no-underline cursor-pointer block">
                    TuahChat ➡️
                </Link>
            </div>
        </div>
    </section>
    );
}