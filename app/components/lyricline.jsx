'use client';

import { useCompletion } from "ai/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LyricLine({line}) {
	const { completion, complete } = useCompletion({
		api: '/api/stream',
	});
	const [isClick, setIsClick] = useState(false);
	const { user } = useAuth();

	async function translateLine() {
		try{
			if(user){
				setIsClick(!isClick);
				if(!isClick) await complete(`Translate the line: "${line}" into the language: "${user.language}." `);
			}
		} catch (err) {
			console.error(err);
		}
	}
	return(
		<p className="hover:text-orange-500 transition-colors duration-300"
		onClick={translateLine}>{isClick ? (completion) : (line)}</p>
	);
}