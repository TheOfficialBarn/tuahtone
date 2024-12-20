import Flashcard from "./flashcard";

export default function BigFlashCard({wordsObjArray}){

	return(
		<section>
			<div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl p-1">
				<div className="bg-blue py-16 rounded-t-lg flex overflow-x-auto
				[&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400
				scroll-smooth scroll-px-6 snap-x">
					<div className="flex gap-4 px-4">
						{wordsObjArray.map(wordObj => (
							<div className="snap-start" key={wordObj.id}>
								<Flashcard
									className="bg-lightBlue shadow-slate-400 shadow-md rounded-2xl w-64 h-48 flex items-center justify-center"
									word={wordObj.word}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="bg-blue h-2 rounded-b-lg"/>
			</div>
		</section>
	);
}