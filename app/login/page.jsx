"use client";

import localFont from 'next/font/local';
import AuthContainer from '../components/authcontainer';

// Font setup
const jetBrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jet-brains-mono",
  weight: "100 900",
});

export default function Page() {
  return (
    <section className={`${jetBrainsMono.variable} flex flex-col items-center justify-center`}>
      {/* The auth container holds all the logic and the Page for signing in, signing out, and creating an account. */}
      <AuthContainer/>
    </section>
  );
}
