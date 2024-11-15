'use client';
import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Flashcard({ word}) {
  const { user } = useAuth();
  const [translatedWord, setTranslatedWord] = useState('');

  useEffect(() => {
    const translateWord = async () => {
      try {
        const response = await fetch('../api/completion', {
          method: 'POST',
          body: JSON.stringify({ prompt: `In 3 words maximum ONLY translate ${word} to ${user.language}`}),
        });
        const json = await response.json();
        setTranslatedWord(json.text);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedWord(word);
      }
    };

    translateWord();
  }, [word]);

  return (
    <div className="py-4 px-8 bg-songblockbackground rounded-xl">
      <div className="group h-64 w-64" style={{ perspective: '1000px' }}>
        <div
          className="relative h-full w-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            <h2 className="text-center">{word}</h2>
          </div>
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <h2 className="text-center">{translatedWord}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}