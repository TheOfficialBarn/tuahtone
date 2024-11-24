import Image from "next/image";

export default function SongWordsWidget({track, artist}) {
	return(
		<section>
			<div className="p-4 bg-songblockbackground hover:bg-zinc-900 transition-colors  duration-500 rounded-xl flex items-center space-x-4 cursor cursor-pointer">
				<Image src="/music.png" alt="Music Icon" width={100} height={100} />
				<div className="flex-1">
					<h2 className="text-lg font-semibold">{track}</h2>
					<p className="text-gray-600">{artist}</p>
				</div>
			</div>
		</section>
	);
}