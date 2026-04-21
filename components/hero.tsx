"use client"

import { motion } from "framer-motion"
import { Download, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"

// Terminal lines to type
const terminalLines = [
  "$ gunashree --profile",
  "name: Gunashree Rajakumar",
  "role: Senior SWE · Applied AI Engineer",
  "location: Boston, MA (remote-ready)",
  "stack: ML → LLM → RAG → MCP → Prod",
  "aiera × anthropic: LIVE ●",
  "status: open_to_work"
]

export function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  const resetAnimation = useCallback(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setIsTyping(true)
  }, [])

  useEffect(() => {
    if (!isTyping) return

    // All lines completed
    if (currentLineIndex >= terminalLines.length) {
      setIsTyping(false)
      // Wait 2 seconds then restart
      const restartTimeout = setTimeout(() => {
        resetAnimation()
      }, 2000)
      return () => clearTimeout(restartTimeout)
    }

    const currentLine = terminalLines[currentLineIndex]

    // Still typing current line
    if (currentCharIndex < currentLine.length) {
      const charTimeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev]
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.slice(0, currentCharIndex + 1))
          } else {
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          }
          return newLines
        })
        setCurrentCharIndex(prev => prev + 1)
      }, 40) // 40ms per character
      return () => clearTimeout(charTimeout)
    } else {
      // Line complete, move to next line after 300ms pause
      const lineTimeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
        setCurrentCharIndex(0)
      }, 300)
      return () => clearTimeout(lineTimeout)
    }
  }, [currentLineIndex, currentCharIndex, isTyping, resetAnimation])

  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00FF41] text-xs font-mono opacity-[0.06] pointer-events-none select-none"
            style={{ left: `${(i / 30) * 100}%` }}
            initial={{ y: -200 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="leading-4">
                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)'
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0D0D0D] rounded-lg border border-[#1A1A1A] shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-[#1A1A1A]">
            {/* Traffic light buttons */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
            </div>
            {/* Title bar */}
            <div className="flex-1 text-center">
              <span className="text-[#4A4A4A] text-sm font-mono">gunashree@production ~</span>
            </div>
            {/* Spacer for centering */}
            <div className="w-[52px]" />
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 min-h-[320px] font-mono">
            {displayedLines.map((line, index) => (
              <div key={index} className="mb-2">
                <span 
                  className="text-[#00FF41] text-base md:text-lg"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {line}
                  {/* Show cursor on current line being typed */}
                  {index === currentLineIndex && isTyping && (
                    <motion.span
                      className="inline-block w-3 h-5 bg-[#00FF41] ml-0.5 align-middle"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </span>
              </div>
            ))}
            {/* Show blinking cursor at end when all lines are done */}
            {!isTyping && displayedLines.length === terminalLines.length && (
              <div className="mb-2">
                <span className="text-[#00FF41] text-base md:text-lg" style={{ fontFamily: "'Courier New', monospace" }}>
                  $ <motion.span
                    className="inline-block w-3 h-5 bg-[#00FF41] ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-[#00FF41] hover:bg-[#00CC33] text-[#050505] font-bold px-8 py-6 text-lg font-mono"
          >
            View Projects
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-[#050505] px-8 py-6 text-lg font-mono"
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </a>
          </Button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 mt-12"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "10K+", label: "Requests/Min" },
            { value: "4", label: "Companies" }
          ].map((stat, i) => (
            <div key={i} className="text-center font-mono">
              <div className="text-3xl font-bold text-[#00FF41]">{stat.value}</div>
              <div className="text-sm text-[#4A4A4A]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-6 w-6 text-[#00FF41] opacity-50" />
      </motion.div>
    </section>
  )
}
