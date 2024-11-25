'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  return (
    <section>
      <h1 className="bg-gradient-to-br from-purple-300 to-pink-500 text-transparent bg-clip-text">TuahChat</h1>
      <small className='block mb-2 text-center'>Powered by Tone Intelligence</small>
      {/* Background */}
      <div className="flex flex-col h-[66vh] w-full max-w-md mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-4 bg-gray-800 rounded-lg shadow-md mb-4 scrollbar-hide">
          {messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap mb-2 p-2">
              <strong className={m.role === 'user' ? 'text-purple-500' : 'text-fuchsia-500'}>
                {m.role === 'user' ? 'User: ' : 'Tuah: '}
              </strong>
              <span className="text-white">{m.content}</span>
            </div>
          ))}
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            placeholder="Learn something new..."
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-lightBlue transition-colors duration-300 text-white font-semibold rounded-md hover:bg-darkBlue"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}