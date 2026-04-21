"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Send } from "lucide-react"

interface Message {
  role: "user" | "ai"
  text: string
}

const CONVERSATION: Message[] = [
  { role: "user", text: "What do you build?" },
  { role: "ai", text: "Production AI systems for Wall Street — RAG pipelines, MCP servers, LLM inference at 10K+ req/min" },
  { role: "user", text: "Biggest achievement?" },
  { role: "ai", text: "Built the official Aiera × Anthropic integration — live in production, used by hedge funds daily" },
  { role: "user", text: "Available to hire?" },
  { role: "ai", text: "Yes — May 2026. Boston, NYC, SF or remote" },
]

const CHAR_DELAY = 25 // ms per character
const MESSAGE_PAUSE = 800 // ms between messages
const RESTART_DELAY = 3000 // ms before restarting

export function AIChatHero() {
  const [displayedMessages, setDisplayedMessages] = useState<{ role: "user" | "ai"; text: string }[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentMessageIndex >= CONVERSATION.length) {
      // Restart after delay
      const timer = setTimeout(() => {
        setDisplayedMessages([])
        setCurrentMessageIndex(0)
        setCurrentCharIndex(0)
        setIsTyping(true)
      }, RESTART_DELAY)
      return () => clearTimeout(timer)
    }

    const currentMessage = CONVERSATION[currentMessageIndex]
    
    if (currentCharIndex < currentMessage.text.length) {
      // Still typing current message
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => {
          const newMessages = [...prev]
          if (newMessages.length <= currentMessageIndex) {
            newMessages.push({ role: currentMessage.role, text: currentMessage.text.slice(0, currentCharIndex + 1) })
          } else {
            newMessages[currentMessageIndex] = { role: currentMessage.role, text: currentMessage.text.slice(0, currentCharIndex + 1) }
          }
          return newMessages
        })
        setCurrentCharIndex(prev => prev + 1)
      }, CHAR_DELAY)
      return () => clearTimeout(timer)
    } else {
      // Message complete, pause then move to next
      setIsTyping(false)
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1)
        setCurrentCharIndex(0)
        setIsTyping(true)
      }, MESSAGE_PAUSE)
      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex, currentCharIndex])

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold text-card-foreground">Ask Guna AI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-500 font-medium">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-4 h-[280px] overflow-y-auto flex flex-col gap-3 bg-background/50">
        {displayedMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
              {/* Blinking cursor on current message */}
              {i === currentMessageIndex && isTyping && (
                <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Typing indicator when AI is about to respond */}
        {currentMessageIndex < CONVERSATION.length && 
         CONVERSATION[currentMessageIndex].role === "ai" && 
         currentCharIndex === 0 && 
         displayedMessages.length === currentMessageIndex && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Bar */}
      <div className="px-4 py-3 border-t border-border bg-card">
        <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2 border border-border">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            disabled
          />
          <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
