import Link from "next/link";
import SongsBlock from "./home-components/songsblock";
import Search from './home-components/search';

export default function Home(){
    return(
    <section>
        <h1>Home</h1>
            <Search/>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
            <SongsBlock language="Spanish" flag="🇲🇽" playlistId="37i9dQZEVXbO3qyFxbkOE1"/>
            <SongsBlock language="English" flag="🇺🇸" playlistId="37i9dQZEVXbLRQDuF5jeBp"/>
            {/* French */}
            <div className="lg:col-span-2 xl:col-span-1 h-full">
                <SongsBlock
                    language="French"
                    flag="🇫🇷"
                    playlistId="37i9dQZEVXbIPWwFssbupI"
                    className="h-full"
                />
            </div>
            <Link href="/morelanguages" className="bg-songblockbackground rounded-xl p-6 col-span-full no-underline cursor-pointer">More Languages ➡️</Link>
            {/* TuahChat */}
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl p-1 col-span-full">
                <Link href="/tuahchat" className="bg-songblockbackground rounded-lg p-6 no-underline cursor-pointer block">
                    TuahChat ➡️
                </Link>
            </div>
        </div>
    </section>
    );
}