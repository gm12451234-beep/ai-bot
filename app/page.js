"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "bot", content: data.text }]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>My AI Bot 🤖</h2>
      <div style={{ border: "1px solid #ccc", height: "350px", overflowY: "auto", padding: "10px", marginBottom: "10px", borderRadius: "8px", background: "#f9f9f9" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "10px 0" }}>
            <span style={{ background: m.role === "user" ? "#0070f3" : "#e0e0e0", color: m.role === "user" ? "#fff" : "#000", padding: "8px 12px", borderRadius: "15px", display: "inline-block" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }} placeholder="Ask me something..." />
        <button onClick={sendMessage} style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send</button>
      </div>
    </div>
  );
    }
