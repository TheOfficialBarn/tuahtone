import SongsBlock from "@/app/(home)/home-components/songsblock";
export default function Page(){
    return(
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
				<SongsBlock language="Portugese" flag="🇵🇹" playlistId="0FMAAt4KT6nYmLj3rwWIxo"/>
				<SongsBlock language="German" flag="🇩🇪" playlistId="0KwsbLDSEy7A5P9xHn1qGu"/>
				<SongsBlock language="Chinese" flag="🇨🇳" playlistId="1HuLhcQu2aZ6VQePfObpuJ"/>
                <SongsBlock language="Japanese" flag="🇯🇵" playlistId="5q6ztbyqMoAEx9AaR1Y442"/>
				<SongsBlock language="Hindi" flag="🇮🇳" playlistId="4s6aflkIZ5mTub2uJ3esj3"/>
				<SongsBlock language="Arabic" flag="🇸🇦" playlistId="2AjU8PyY7L9fs3hNcoyZ1S"/>
			</div>
        </section>
    );
}