import Image from "next/image";

export default function SongWordsWidget({track, artist, imageURL, onClick}) {
	return(
		<section>
			<div
			className="p-4 bg-blue hover:bg-darkBlue transition-colors  duration-300 rounded-xl flex items-center space-x-4 cursor cursor-pointer"
			onClick={onClick}
			>
				<Image src={imageURL} alt="Music Icon" width={100} height={100} className="rounded-md"/>
				<div className="flex-1">
					<h2 className="text-lg font-semibold">{track}</h2>
					<p className="text-gray-600">{artist}</p>
				</div>
			</div>
		</section>
	);
}