import SongsBlock from "../components/songsblock";

export default function Page(){
	return(
		<section>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
					<SongsBlock language="Spanish" flag="🇲🇽"/>
					<SongsBlock language="English" flag="🇺🇸"/>
					<SongsBlock language="English" flag="🇺🇸"/>
					<p className="bg-songblockbackground rounded-xl p-6 col-span-3">More Languages!</p>
				</div>

		</section>
	);
}