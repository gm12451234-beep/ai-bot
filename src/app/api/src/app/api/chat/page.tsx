"use client";
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);

  const askAI = async () => {
    const newChat = [...chat, { role: 'user', content: input }];
    setChat(newChat);
    setInput('');
    const res = await fetch('/route', { // Hum isay seedha route par bhejenge
      method: 'POST',
      body: JSON.stringify({ messages: newChat }),
    });
    const data = await res.json();
    setChat([...newChat, { role: 'assistant', content: data.message }]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>My Personal AI 🤖</h2>
      <div style={{ height: '400px', border: '1px solid #ccc', overflowY: 'scroll', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
            <strong>{msg.role === 'user' ? 'You: ' : 'AI: '}</strong> {msg.content}
          </p>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} 
               value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here..." />
        <button style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px' }} 
                onClick={askAI}>Send</button>
      </div>
    </div>
  );
}
