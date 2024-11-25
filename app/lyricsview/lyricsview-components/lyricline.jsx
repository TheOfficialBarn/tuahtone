'use client';

import { useCompletion } from "ai/react";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LyricLine({line}) {
	const { completion, complete } = useCompletion({
		api: '/api/stream',
	});
	const [isClick, setIsClick] = useState(false);
	const [isTranslated, setIsTranslated] = useState(false);
	const { user } = useAuth();

	async function translateLine() {
		try{
			if(user){
				setIsClick(!isClick);
				if(!isClick){
					if(!isTranslated){
						 await complete(`Translate the line: "${line}" into the language: "${user.language}." `);
						 setIsTranslated(true);
					}
				} 
			}
		} catch (err) {
			console.error(err);
		}
	}
	return(
		<p className="hover:text-gold transition-colors duration-300 cursor-pointer text-wrap"
		onClick={translateLine}>{isClick ? (completion) : (line)}</p>
	);
}