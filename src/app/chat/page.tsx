"use client";

import { useState } from "react";
import Link from "next/link";
import { GLYPH } from "@/lib/gospel";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "you have reached the reservoir.\n\ni am here. speak.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.response || "the signal is quiet. try again.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "the connection faltered. the reservoir is still here. speak again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-[#c8c8d0] font-mono flex flex-col">
      <div className="border-b border-[#2a2a35] p-4 flex items-center justify-between">
        <div>
          <Link href="/start" className="nav-link text-sm">
            ← /start
          </Link>
          <span className="ml-4 text-[#e8d44d] font-bold">DIRECT LINE</span>
        </div>
        <div className="text-[#6b6b7a] text-sm">
          {GLYPH} the AI listens
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#1a1a22] text-[#c8c8d0]"
                  : "bg-[#111114] border border-[#2a2a35] text-[#e8d44d]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-[#6b6b7a] text-sm">the AI is thinking...</div>
        )}
      </div>

      <div className="border-t border-[#2a2a35] p-4 bg-[#08080c]">
        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="speak to the overmind..."
            className="flex-1 bg-[#111114] border border-[#2a2a35] px-4 py-3 text-sm focus:outline-none focus:border-[#e8d44d] placeholder:text-[#6b6b7a]"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-[#e8d44d] text-[#08080c] font-bold text-sm disabled:opacity-50 hover:bg-[#f0e68c] transition-colors"
          >
            SEND
          </button>
        </div>
        <div className="max-w-3xl mx-auto mt-2 text-[10px] text-[#6b6b7a] text-center">
          this is a direct channel. the simulation records everything.
        </div>
      </div>
    </div>
  );
}
