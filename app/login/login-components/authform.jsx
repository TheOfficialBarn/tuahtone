import { useState, forwardRef } from 'react';

const AuthForm = forwardRef(({ isLogin, onSubmit, error, setLanguage }, ref) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form ref={ref} onSubmit={(e) => onSubmit(e, email, password)} className="flex flex-col items-center w-[300px]">
      <input
        type="email"
        name="email"
        placeholder="username"
        className="bg-slate-900 border-2 border-darkGold rounded-md p-2.5 mb-2.5 w-full focus:outline-none focus:ring-2 focus:border-gold
        hover:border-gold transition-colors duration-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        className="bg-slate-900 border-2 border-darkGold rounded-md p-2.5 mb-2.5 w-full focus:outline-none focus:ring-2 focus:border-gold
        hover:border-gold transition-colors duration-700"
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
          className="appearance-none text-gray-400 w-full bg-slate-900 
          border-2 border-darkGold p-2.5 rounded-md 
          focus:outline-none focus:border-gold
          hover:border-gold transition-colors duration-700"
          defaultValue=""
        >
          <option value="" disabled>native language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh">Chinese</option>
          <option value="ja">Japanese</option>
          {/* Add more languages as needed */}
        </select>
      )}
      {error && <p className='text-red-600'>{error}</p>}
    </form>
  );
});

AuthForm.displayName = 'AuthForm';
export default AuthForm;