'use client';
import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Flashcard({ word}) {
	const { user } = useAuth();
	const [translatedWord, setTranslatedWord] = useState('loading...');
	const [isFlipped, setIsFlipped] = useState(false); // Add state for flip


	async function translateWord() {
		try {
			const response = await fetch('../api/completion', {
				method: 'POST',
				body: JSON.stringify({ prompt: `In 3 words maximum ONLY translate (don't surround with quotes): "${word}" to ${user.language}`}),
			});
			const json = await response.json();
			setTranslatedWord(json.text);
		} catch (error) {
			console.error('Translation error:', error);
			setTranslatedWord(word);
		}
		};

	function flipCard(){
		if(isFlipped === false) {
			setIsFlipped(true);
			if(translatedWord === 'loading...') translateWord(); 
	} else setIsFlipped(false);

  };

	return (
		<div className="bg-songblockbackground rounded-xl" onClick={flipCard}>
			<div className="group my-20 [perspective:1000px]">
				<div className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
				<div className=" [backface-visibility:hidden] flex items-center justify-center">
					<h2 className="text-center no-underline">{word}</h2>
				</div>
				<div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center">
					<h2 className="text-center no-underline">{translatedWord}</h2>
				</div>
				</div>
			</div>
		</div>
	);
}