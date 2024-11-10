import SongWidget from "../components/songwidget";

export default function Page() {
    return (
        <section>
            <h1>Songs</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
				<SongWidget/>
            </div>
        </section>
    );
}