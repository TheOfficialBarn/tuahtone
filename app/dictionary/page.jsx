import Flashcard from "../components/flashcard";

export default function Page(){
	return(
		<section>
			<h1>Flashcard Practice!</h1>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 style={{overflow: 'visible' }}">
				<Flashcard/>
				<Flashcard/>
				<Flashcard/>
				<Flashcard/>
				<Flashcard/>
			</div>
		</section>
	);
}
