import Link from "next/link";
import SongsBlock from "./home-components/songsblock";
import Search from './home-components/search';

export default function Home(){
    return(
    <section>
        <h1>Home</h1>
        <Search/>
        <h3 className="text-slate-700 ">Featured Songs</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4">
            <SongsBlock language="Spanish" flag="🇲🇽" playlistId="2yZOyN9DTowWG9jCpoZ3gl"/>
            <SongsBlock language="English" flag="🇺🇸" playlistId="4EVmEZ50aF6mmr6tPpDJNI"/>
            {/* French */}
            <div className="lg:col-span-2 xl:col-span-1 h-full">
                <SongsBlock
                    language="French"
                    flag="🇫🇷"
                    playlistId="20IuHjETE8ZjOrifZg6wQX"
                    className="h-full"
                />
            </div>
            <Link href="/morelanguages" className="bg-blue  rounded-xl p-6 col-span-full hover:bg-darkBlue transition-colors duration-300">More Languages ➡️</Link>
        </div>
            <div className="border-t border-slate-700 col-span-full">
                <h3 className="text-slate-700">More</h3>
            </div>
            {/* TuahChat */}
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl p-1 col-span-full">
                <Link href="/tuahchat" className="bg-blue rounded-lg p-6 block hover:bg-darkBlue transition-colors duration-300">
                    TuahChat ➡️
                </Link>
            </div>
    </section>
    );
}