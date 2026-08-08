import { useState } from "react";

export default function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ sender: "ai", text: "Hello! I'm Classic Insight AI. Ask me anything about hotel reviews." }]);
  const [isOpen, setIsOpen] = useState(false);
  async function sendMessage() {
    if (!message.trim()) return;
    const text = message;
    setMessages((items) => [...items, { sender: "user", text }]);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await response.json();
      setMessages((items) => [...items, { sender: "ai", text: data.reply || "I couldn't generate a response." }]);
    } catch { setMessages((items) => [...items, { sender: "ai", text: "Unable to connect to AI." }]); }
  }
  return <>
    {!isOpen && <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full bg-[var(--accent)] text-3xl text-[var(--button-text)] shadow-2xl transition hover:scale-110" aria-label="Open AI chat">💬</button>}
    {isOpen && <section className="app-card fixed bottom-6 right-6 z-40 w-80 overflow-hidden rounded-xl border shadow-2xl">
      <header className="flex items-center justify-between bg-[var(--accent)] p-3 font-bold text-[var(--button-text)]"><span>Classic Insight AI 🤖</span><button onClick={() => setIsOpen(false)} aria-label="Close AI chat">×</button></header>
      <div className="h-80 overflow-y-auto p-3">{messages.map((item, index) => <div key={index} className={`mb-3 ${item.sender === "user" ? "text-right" : "text-left"}`}><span className="inline-block rounded-lg bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text)]">{item.text}</span></div>)}</div>
      <div className="flex border-t border-[var(--border)]"><input className="app-input min-w-0 flex-1 p-3 outline-none" value={message} placeholder="Ask something..." onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} /><button onClick={sendMessage} className="bg-[var(--accent)] px-5 font-semibold text-[var(--button-text)]">Send</button></div>
    </section>}
  </>;
}
