
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...newMessages, { from: 'user', text: input }, { from: 'bot', text: data.reply }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Chat met NODO Support 🤖</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 400, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.from === 'user' ? 'Jij' : 'NODO'}:</strong> {msg.text}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Typ je vraag..."
        style={{ width: '70%', padding: 10 }}
      />
      <button onClick={sendMessage} style={{ padding: 10 }}>Verstuur</button>
    </div>
  );
}
