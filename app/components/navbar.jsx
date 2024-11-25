'use client';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { path: '/', name: 'home' },
  { path: '/words', name: 'words' },
  { path: '/songs', name: 'songs' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
    <aside className="mb-16 tracking-tight w-full flex justify-between items-center px-4">
      {/* TuahTone Logo */}
      <div id="logo">
        TUAH TONE
      </div>
      {/* Navigation Bar */}
      <nav
        className="flex flex-row flex-wrap items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 max-md:hidden md:relative"
        id="nav"
      >
        <div className="flex flex-row flex-wrap space-x-0 rounded-xl px-8">
          {navItems.map(({ path, name }) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-300 flex align-middle relative py-1 px-2 m-1"
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>
      {/* Profile Button */}
      <div className="max-md:hidden">
        <Link href="/login" id='profileButton' className="buttonStyle">
            Profile
        </Link>
      </div>
      {/* Hamburger Button */}
      <div className="md:hidden absolute right-6 top-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:text-gray-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
    </aside>
    {/* Mobile Menu */}
    {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center"
        onClick={() => setIsMenuOpen(false)}
        >
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map(({ path, name }) => (
              <Link
                key={path}
                href={path}
                className="text-2xl font-semibold transition-all hover:text-neutral-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
          {/* Profile Button */}
          <div className="mt-8">
          <Link href="/login" id='profileButton' className="buttonStyle" onClick={() => setIsMenuOpen(false)}>
            Profile
          </Link>
          </div>
        </div>
      )}
    </>
  );
}