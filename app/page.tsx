"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: "bot", content: data.text }]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>My AI Bot 🤖</h1>
      <div style={{ border: "1px solid #ccc", height: "400px", overflowY: "scroll", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: "10px 0", textAlign: m.role === "user" ? "right" : "left" }}>
            <span style={{ background: m.role === "user" ? "#007bff" : "#eee", color: m.role === "user" ? "#fff" : "#000", padding: "8px 12px", borderRadius: "15px", display: "inline-block" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} placeholder="Ask me anything..." />
        <button onClick={sendMessage} style={{ padding: "10px 20px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send</button>
      </div>
    </div>
  );
  }
