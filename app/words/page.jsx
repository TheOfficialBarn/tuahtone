"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { db } from '@/app/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import BigFlashCard from './words-components/bigflashcard';
import SongWords from './words-components/songwords';

export default function Page() {
	const { user, loading } = useAuth();
	const [flashcards, setCard] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
	if (!loading && user) {
		async function fetchCards() {
		try {
			const cardsCollectionRef = collection(db, 'users', user.uid, 'flashcards');
			const cardsSnapshot = await getDocs(cardsCollectionRef);
			const cardsList = cardsSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setCard(cardsList);
		} catch (err) {
			setError(err.message);
			console.error("Error fetching flashcards", err);
		}
		}
		fetchCards();
	}
	}, [user, loading]);

	if (loading) return <p>loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!user) return <h1>Sign in to view Words</h1>;

	return (
		<section>
			<h1>Words</h1>
			<BigFlashCard wordsObjArray={flashcards} />

			<Link href="words/wordslibrary" className="bg-songblockbackground rounded-xl p-6 cursor-pointer block my-4">
			Words Library ➡️
			</Link>

			<SongWords/>
		</section>
	);
}
