import localFont from 'next/font/local';

const jetBrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Regular.woff2",
  variable: "--font-jet-brains-mono",
  weight: "100 900",
});

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-center mt-20" style={{ fontFamily: 'var(--font-jet-brains-mono)' }}>
      <h1 className="mb-5">login</h1>
      <input type="text" placeholder="username" className="bg-songblockbackground rounded-xl p-2 mb-2" /> 
      <input type="password" placeholder="password" className="bg-songblockbackground rounded-xl p-2" /> 
    </section>
  );
}
