"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, FileText, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { chatbotQA, getAnswer } from "@/lib/chatbot-data"

interface Message {
  id: number
  text: string
  isUser: boolean
  isTyping?: boolean
}

// Typewriter effect for AI responses
function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 20)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, onComplete])

  return <span>{displayText}</span>
}

// Typing indicator dots
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm Guna's AI assistant. Ask me anything about her experience, skills, or what she's looking for. You can also click the quick questions below!",
      isUser: false
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [bubblePhase, setBubblePhase] = useState<"enter" | "bounce" | "exit">("enter")
  const [typingComplete, setTypingComplete] = useState<Record<number, boolean>>({ 0: true })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Show button after 2s delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Bubble animation sequence: show after 3s, bounce, fade after 5s
  useEffect(() => {
    if (!showButton || isOpen) return

    const bubbleTimer1 = setTimeout(() => {
      setShowBubble(true)
      setBubblePhase("enter")
    }, 3000)

    const bubbleTimer2 = setTimeout(() => {
      setBubblePhase("bounce")
    }, 3500)

    const bubbleTimer3 = setTimeout(() => {
      setBubblePhase("exit")
    }, 8000)

    const bubbleTimer4 = setTimeout(() => {
      setShowBubble(false)
    }, 8500)

    return () => {
      clearTimeout(bubbleTimer1)
      clearTimeout(bubbleTimer2)
      clearTimeout(bubbleTimer3)
      clearTimeout(bubbleTimer4)
    }
  }, [showButton, isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleQuestionClick = (question: string) => {
    if (isTyping) return

    const userMessage: Message = {
      id: messages.length,
      text: question,
      isUser: true
    }
    setMessages(prev => [...prev, userMessage])
    setTypingComplete(prev => ({ ...prev, [userMessage.id]: true }))
    setIsTyping(true)
    setShowBubble(false) // Hide bubble when chat starts

    // Simulate AI thinking time
    setTimeout(() => {
      const answer = getAnswer(question)
      const aiMessage: Message = {
        id: messages.length + 1,
        text: answer,
        isUser: false
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleTypingComplete = (messageId: number) => {
    setTypingComplete(prev => ({ ...prev, [messageId]: true }))
  }

  return (
    <>
      {/* Notification Bubble */}
      <AnimatePresence>
        {showBubble && showButton && !isOpen && (
          <div
            className="fixed bottom-24 right-6 z-50"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className={`bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-white text-xs font-bold px-3 py-2.5 rounded-[12px] rounded-br-none shadow-lg whitespace-nowrap relative ${
                bubblePhase === "enter" ? "bubble-slide-in" : ""
              } ${bubblePhase === "bounce" ? "bubble-bounce" : ""} ${
                bubblePhase === "exit" ? "bubble-fade-out" : ""
              }`}
            >
              Ask me anything! 👋
              {/* Triangle pointer */}
              <div
                className="absolute -bottom-2 right-3 w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "0px solid transparent",
                  borderTop: "8px solid rgb(123, 97, 255)"
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1.5">
            {/* Label - hidden on mobile */}
            <span className="hidden sm:block text-[10px] text-[#8BA3BC] font-medium">
              Chat with Guna AI
            </span>

            {/* Button wrapper with notification badge */}
            <div className="relative">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onClick={() => {
                  setIsOpen(true)
                  setShowBubble(false)
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
                aria-label="Open chat"
              >
                {/* Pulse animation ring */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] animate-ping opacity-30" />
                <MessageCircle className="h-7 w-7 text-white relative z-10 group-hover:scale-110 transition-transform" />

                {/* Notification Badge */}
                {!isOpen && (
                  <motion.div
                    className="badge-pulse absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                    animate={{ scale: 1 }}
                  >
                    <span className="text-white text-[10px] font-bold">1</span>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Ask Guna AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.isUser
                        ? "bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] text-white rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {message.isUser || typingComplete[message.id] ? (
                      message.text
                    ) : (
                      <TypewriterText
                        text={message.text}
                        onComplete={() => handleTypingComplete(message.id)}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Question Chips */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {chatbotQA.map((qa, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuestionClick(qa.question)}
                    disabled={isTyping}
                    className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {qa.question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-4 py-3 border-t border-border flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                asChild
              >
                <a
                  href="https://drive.google.com/uc?export=download&id=1mjO0TQ3qORy1HZu-sOa1TC4cxfrm_XEb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  View Resume
                </a>
              </Button>
              <Button
                size="sm"
                className="flex-1 text-xs bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] hover:opacity-90"
                asChild
              >
                <a href="#contact">
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
