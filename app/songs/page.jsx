"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import SongWidget from "../components/songwidget";
import localFont from 'next/font/local';

// ... your font setup ...

export default function Page() {
    return (
        <section>
            <h1>Songs</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
				<SongWidget track="Donda" artist="Kanye West"/>
                <SongWidget track="Goosebumps" artist="Travis Scott"/>
                <SongWidget track="Bye Me Fui" artist="Bad Bunny"/>
                <SongWidget track="All Red" artist="Playboi Carti"/>
                <SongWidget track="Bodak Yellow" artist="Cardi B"/>
            </div>
        </section>
    );
}
