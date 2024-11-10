import SongsBlock from "@/app/components/songsblock";
export default function Page(){
    return(
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
				<SongsBlock language="Portugese" flag="🇵🇹" playlistId="0FMAAt4KT6nYmLj3rwWIxo"/>
				<SongsBlock language="German" flag="🇩🇪" playlistId="37i9dQZEVXbJiZcmkrIHGU"/>
				<SongsBlock language="Chinese" flag="🇨🇳" playlistId="1HuLhcQu2aZ6VQePfObpuJ"/>
                <SongsBlock language="Japanese" flag="🇯🇵" playlistId="37i9dQZEVXbKXQ4mDTEBXq"/>
				<SongsBlock language="Hindi" flag="🇮🇳" playlistId="37i9dQZEVXbLZ52XmnySJg"/>
				<SongsBlock language="Arabic" flag="🇸🇦" playlistId="2AjU8PyY7L9fs3hNcoyZ1S"/>
			</div>
        </section>
    );
}