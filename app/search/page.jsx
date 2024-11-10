'use client';
import { useRouter } from 'next/navigation';
import SongsBlock from "../components/songsblock";

export default function Page() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/search/morelanguages');
    };

    return (
        <section>
            <h1>Search</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <SongsBlock language="Spanish" flag="🇲🇽" playlistId="37i9dQZF1EIdXls7Ic0RlM" />
                <SongsBlock language="English" flag="🇺🇸" playlistId="37i9dQZF1DX0kbJZpiYdZl" />
                <SongsBlock language="French" flag="🇫🇷" playlistId="37i9dQZF1EIdjOVgwfpWk6" />
                <h2
                    className="bg-songblockbackground rounded-xl p-6 col-span-3 no-underline cursor-pointer"
                    onClick={handleClick}
                >
                    More Languages! ➡️
                </h2>
            </div>
        </section>
    );
}