// app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components/navbar";
import Image from "next/image";
import ProfileButton from "./components/profilebutton";
import { AuthProvider } from "./context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tuah Tone",
  description: "Learn languages with songs!",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased lg:mx-auto bg-fixed h-screen bg-mainbackground`}>
          <div className="relative flex justify-center items-center bg-gradient-to-b from-navbackground">
            <div className="pt-4">
              <div className="absolute left-4 top-4">
                <Image className="" src="/logo.png" alt="logo" height={200} width={200}/>
              </div>
              <div className="flex justify-center"><Navbar /></div>
              <div className="absolute right-4 top-6"><ProfileButton/></div>
            </div>
          </div>
          <div className="mx-16 pb-8">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
