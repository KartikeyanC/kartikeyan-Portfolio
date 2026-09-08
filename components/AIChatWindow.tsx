"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { site } from "@/data/content";
import { quickQuestions } from "@/data/portfolio";
import { answer, type AIAnswer } from "@/lib/ai";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Msg = { id: number; role: "user" | "ai"; text: string; links?: AIAnswer["links"] };

const welcome: Msg = {
  id: 0,
  role: "ai",
  text: `Hi! I'm ${site.name}'s AI assistant. I can help you explore his work, skills, design process, services, and availability. What would you like to know?`,
};

let uid = 1;

export default function AIChatWindow({ onClose }: { onClose: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([welcome]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
    const pending = timers.current; // stable array ref; cleared on unmount
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      pending.forEach(clearTimeout);
    };
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, typing, reduced]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: uid++, role: "user", text }]);
    setInput("");
    setTyping(true);
    const t = setTimeout(() => {
      const a = answer(text);
      setTyping(false);
      setMessages((m) => [...m, { id: uid++, role: "ai", text: a.text, links: a.links }]);
    }, reduced ? 120 : 600);
    timers.current.push(t);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setTyping(false);
    setMessages([welcome]);
    setInput("");
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask(input);
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Ask AI about ${site.name}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      style={{ transformOrigin: "bottom right" }}
      className="fixed inset-0 z-[210] flex flex-col overflow-hidden border-border bg-bg sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[700px] sm:max-h-[calc(100dvh-8rem)] sm:w-[460px] sm:rounded-[28px] sm:border"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-bg-secondary px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-sm font-semibold text-white">
            {site.initials}
          </span>
          <div>
            <div className="text-sm font-semibold text-text">Ask AI</div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Available to help · Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={reset}
            aria-label="Reset conversation"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface hover:text-text"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface hover:text-text"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-orange text-white"
                  : "bg-surface text-text"
              }`}
            >
              <p>{m.text}</p>
              {m.links && m.links.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                  {m.links.map((l) =>
                    l.external ? (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-border bg-bg px-3 py-2 text-xs font-medium text-text transition-colors hover:border-orange"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        key={l.href + l.label}
                        href={l.href}
                        onClick={onClose}
                        className="rounded-lg border border-border bg-bg px-3 py-2 text-xs font-medium text-text transition-colors hover:border-orange"
                      >
                        {l.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1 rounded-2xl bg-surface px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-text-secondary"
                    animate={reduced ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick questions */}
      <div className="flex gap-2 overflow-x-auto border-t border-border px-5 py-3 [scrollbar-width:none]">
        {quickQuestions.map((qq) => (
          <button
            key={qq.label}
            type="button"
            onClick={() => ask(qq.q)}
            className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-orange hover:text-text"
          >
            {qq.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface px-3 py-2 focus-within:border-orange">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder={`Ask me anything about ${site.name}...`}
            className="max-h-28 flex-1 resize-none bg-transparent py-1.5 text-sm text-text outline-none placeholder:text-text-muted"
          />
          <button
            type="button"
            onClick={() => ask(input)}
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange text-white transition-opacity hover:bg-orange-hover disabled:opacity-40"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
