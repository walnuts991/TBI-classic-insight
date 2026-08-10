import { useState } from "react";
import { useLocation } from "react-router-dom";

const CONSENT_KEY = "classicInsightAiConsent";
const welcomeMessage = { sender: "ai", text: "Hello! I'm Classic Insight AI. Ask me anything about hotel reviews." };

export default function AIChat() {
  const { pathname } = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([welcomeMessage]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const hidden = pathname === "/login" || pathname === "/register";
  const addAssistantMessage = (text) => setMessages((items) => [...items, { sender: "ai", text }]);

  function openChat() {
    if (!localStorage.getItem("token")) {
      setIsOpen(true);
      addAssistantMessage("Please sign in before I analyze your hotel reviews.");
      return;
    }
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== "allowed") {
      setShowConsent(true);
      return;
    }
    setIsOpen((open) => !open);
  }

  function saveConsent(choice) {
    localStorage.setItem(CONSENT_KEY, choice);
    setShowConsent(false);
    setIsOpen(true);
    if (choice === "denied") {
      addAssistantMessage("Permission is required before I can analyze your hotel reviews. Choose Allow when you are ready.");
    }
  }

  async function sendMessage() {
    const text = message.trim();
    if (!text || isLoading) return;
    const consent = localStorage.getItem(CONSENT_KEY);
    setMessages((items) => [...items, { sender: "user", text }]);
    setMessage("");
    if (consent !== "allowed") {
      addAssistantMessage("Permission is required before I can analyze your hotel reviews. Choose Allow when you are ready.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ message: text, consent: true }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Classic Insight AI is unavailable right now.");
      addAssistantMessage(data.reply || "I couldn't generate a response from your review data.");
    } catch (error) {
      addAssistantMessage(error.message || "Unable to connect to Classic Insight AI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (hidden) return null;
  return <>
    {!isOpen && <button onClick={openChat} className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full bg-[var(--accent)] text-3xl text-[var(--button-text)] shadow-2xl transition hover:scale-110" aria-label="Open AI chat">💬</button>}
    {isOpen && <section className="app-card fixed bottom-6 right-6 z-40 w-80 overflow-hidden rounded-xl border shadow-2xl">
      <header className="flex items-center justify-between bg-[var(--accent)] p-3 font-bold text-[var(--button-text)]"><span>Classic Insight AI 🤖</span><button onClick={() => setIsOpen(false)} aria-label="Close AI chat">×</button></header>
      <div className="h-80 overflow-y-auto p-3">
        {messages.map((item, index) => <div key={index} className={`mb-3 ${item.sender === "user" ? "text-right" : "text-left"}`}><span className="inline-block rounded-lg bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text)]">{item.text}</span></div>)}
        {isLoading && <div className="mb-3 text-left"><span className="inline-flex items-center gap-1 rounded-lg bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--text)]"><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:120ms]" /><i className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)] [animation-delay:240ms]" /></span></div>}
      </div>
      <div className="flex border-t border-[var(--border)]"><input className="app-input min-w-0 flex-1 p-3 outline-none" value={message} placeholder="Ask something..." disabled={isLoading} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} /><button onClick={sendMessage} disabled={isLoading} className="bg-[var(--accent)] px-5 font-semibold text-[var(--button-text)] disabled:opacity-60">Send</button></div>
    </section>}
    {showConsent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5" role="dialog" aria-modal="true" aria-labelledby="ai-consent-title">
      <div className="app-card w-full max-w-md rounded-2xl border p-6 shadow-2xl"><h2 id="ai-consent-title" className="text-xl font-bold text-[var(--text)]">Allow Classic Insight AI to analyze your hotel reviews?</h2><p className="app-muted mt-3 text-sm leading-6">Classic Insight AI only uses your uploaded reviews to answer your questions and generate hotel analytics.</p><div className="mt-6 flex justify-end gap-3"><button onClick={() => saveConsent("denied")} className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)]">Not Now</button><button onClick={() => saveConsent("allowed")} className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--button-text)]">Allow</button></div></div>
    </div>}
  </>;
}
