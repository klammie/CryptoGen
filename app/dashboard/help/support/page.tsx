"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, Send } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function PopupChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the conversation pinned to the latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, botTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setBotTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Thank you for your message. Please wait while we connect you with one of our available agents.",
          sender: "bot",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Support
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
            How can we help?
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Chat with our team — we&apos;re available 24/7.
          </p>
        </div>

        {/* Chat card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Chat header (dark bank-panel style) */}
          <div className="relative flex items-center gap-3 bg-slate-900 px-5 py-4">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/25 blur-2xl" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">
              <Headphones className="h-5 w-5 text-indigo-300" />
            </div>
            <div className="relative flex-1">
              <p className="text-sm font-semibold text-white">CryptoGen Support</p>
              <p className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Online — we typically reply in a few minutes
              </p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex h-[380px] flex-col gap-3 overflow-y-auto p-5"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : "rounded-bl-md border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {botTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-slate-100 p-4 dark:border-slate-800"
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-11 flex-1 rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="h-11 w-11 shrink-0 rounded-xl bg-slate-900 text-white hover:bg-black disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}