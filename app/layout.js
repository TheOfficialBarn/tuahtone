import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "./components/navbar";
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto bg-fixed h-screen bg-mainbackground`}>
          <div className="bg-gradient-to-b from-navbackground">
            <div className="pb-2 pt-4"><Navbar /></div>
          </div>
          <div className="mx-4 md:mx-8 lg:mx-16 pb-8">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}