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
      <h2>My AI Bot 🤖</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "5px" }}>
            <span style={{ background: m.role === "user" ? "#0070f3" : "#eee", color: m.role === "user" ? "#fff" : "#000", padding: "5px 10px", borderRadius: "10px" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} style={{ width: "70%", padding: "10px" }} placeholder="Ask me..." />
      <button onClick={sendMessage} style={{ padding: "10px", width: "25%" }}>Send</button>
    </div>
  );
}
