// components/ProfileButton.jsx
import React from 'react';
import Link from 'next/link';

export default function ProfileButton() {
  return (
    <Link href="/login" id='profileButton' className="buttonStyle">
      Profile
    </Link>
  );
}
