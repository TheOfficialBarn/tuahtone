import { useState } from 'react';

export default function AuthForm({ isLogin, onSubmit, error, setLanguage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => onSubmit(e, email, password)} className="flex flex-col items-center">
      <input
        type="email"
        name="email"
        placeholder="username"
        className="bg-songblockbackground rounded-md p-2.5 mb-2.5 w-full max-w-[300px]"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="bg-songblockbackground rounded-md p-2.5 mb-2.5 w-full max-w-[300px]"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e, email, password);
          }
        }}
      />
      {!isLogin && (
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="appearance-none w-full bg-[#2c2e31] border-2 border-[#646669] text-[#c97388] py-2 px-4 pr-8 rounded-md focus:outline-none focus:border-[#e79696] hover:border-[#c97388] transition-colors mb-2.5"
          defaultValue=""
        >
          <option value="" disabled>Select your language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          {/* Add more languages as needed */}
        </select>
      )}
      <button type="submit" className="buttonStyle">
        {isLogin ? 'Login' : 'Create Account'}
      </button>
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  );
}