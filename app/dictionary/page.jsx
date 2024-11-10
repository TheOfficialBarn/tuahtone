// app/dictionary/page.jsx
"use client";

import React from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Page() {
  const { user } = useAuth();

  return (
    <section>
      {user ? (
        <h1>Dictionary: Your Song Word Bank</h1>
      ) : (
        <>
          <h1>Log In to Access Your Dictionary</h1>
        </>
      )}
    </section>
  );
}
