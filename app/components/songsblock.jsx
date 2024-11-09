export default function SongsBlock({language, flag}) {
	return(
		<div className="p-16 bg-songblockbackground rounded-xl">
			<h2>Top 100 {language} Songs {flag}</h2>
		</div>
	);
}
