"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Code lines with syntax highlighting tokens
const codeContent = `class RAGPipeline:
  def __init__(self):
    self.llm = Claude(model="claude-3")
    self.db = OpenSearch()

  async def query(self, input: str):
    # Hybrid BM25 + vector search
    context = await self.db.search(input)
    return await self.llm.generate(context)

# Live at Aiera × Anthropic
# 10,000+ req/min ✓`

// Tokenize a line for syntax highlighting
function tokenizeLine(line: string) {
  const tokens: { text: string; color: string }[] = []
  
  // Keywords (blue)
  const keywords = ['class', 'def', 'async', 'await', 'self', 'return']
  // Built-in/special (yellow for functions)
  const functions = ['__init__', 'query', 'search', 'generate']
  
  let remaining = line
  let i = 0
  
  while (i < remaining.length) {
    // Check for comments (green)
    if (remaining.slice(i).startsWith('#')) {
      if (i > 0) {
        tokens.push({ text: remaining.slice(0, i), color: '#E0E0E0' })
      }
      tokens.push({ text: remaining.slice(i), color: '#6A9955' })
      return tokens
    }
    
    // Check for strings (orange)
    if (remaining[i] === '"' || remaining[i] === "'") {
      const quote = remaining[i]
      let j = i + 1
      while (j < remaining.length && remaining[j] !== quote) j++
      if (i > 0) {
        tokens.push({ text: remaining.slice(0, i), color: '#E0E0E0' })
      }
      tokens.push({ text: remaining.slice(i, j + 1), color: '#CE9178' })
      remaining = remaining.slice(j + 1)
      i = 0
      continue
    }
    
    // Check for keywords
    let foundKeyword = false
    for (const kw of keywords) {
      if (remaining.slice(i).startsWith(kw) && 
          (i === 0 || !/\w/.test(remaining[i - 1])) &&
          (i + kw.length >= remaining.length || !/\w/.test(remaining[i + kw.length]))) {
        if (i > 0) {
          tokens.push({ text: remaining.slice(0, i), color: '#E0E0E0' })
        }
        tokens.push({ text: kw, color: '#569CD6' })
        remaining = remaining.slice(i + kw.length)
        i = 0
        foundKeyword = true
        break
      }
    }
    if (foundKeyword) continue
    
    // Check for functions (yellow)
    for (const fn of functions) {
      if (remaining.slice(i).startsWith(fn) && 
          (i === 0 || !/\w/.test(remaining[i - 1]))) {
        if (i > 0) {
          tokens.push({ text: remaining.slice(0, i), color: '#E0E0E0' })
        }
        tokens.push({ text: fn, color: '#DCDCAA' })
        remaining = remaining.slice(i + fn.length)
        i = 0
        foundKeyword = true
        break
      }
    }
    if (foundKeyword) continue
    
    i++
  }
  
  if (remaining) {
    tokens.push({ text: remaining, color: '#E0E0E0' })
  }
  
  return tokens
}

export function VSCodeEditor() {
  const [displayedCode, setDisplayedCode] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  
  // Typewriter effect
  useEffect(() => {
    let charIndex = 0
    let timeout: NodeJS.Timeout
    
    const typeNext = () => {
      if (charIndex < codeContent.length) {
        setDisplayedCode(codeContent.slice(0, charIndex + 1))
        charIndex++
        timeout = setTimeout(typeNext, 40)
      } else {
        // Wait 2 seconds then restart
        timeout = setTimeout(() => {
          charIndex = 0
          setDisplayedCode("")
          typeNext()
        }, 2000)
      }
    }
    
    typeNext()
    
    return () => clearTimeout(timeout)
  }, [])
  
  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])
  
  // Split displayed code into lines
  const lines = displayedCode.split('\n')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-lg overflow-hidden shadow-2xl"
      style={{ 
        backgroundColor: '#1E1E1E',
        fontFamily: "'Courier New', monospace"
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#323233]">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <div className="text-[#9D9D9D] text-xs">
          gunashree@production ~
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>
      
      {/* Tab bar */}
      <div className="flex items-center bg-[#252526] border-b border-[#1E1E1E]">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1E1E1E] text-[#CCCCCC] text-xs border-t-2 border-t-[#007ACC]">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#3572A5"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3572A5" strokeWidth="2"/>
          </svg>
          rag_pipeline.py
        </div>
      </div>
      
      {/* Code area */}
      <div className="p-4 min-h-[280px] overflow-hidden">
        <div className="flex text-sm leading-6">
          {/* Line numbers */}
          <div className="pr-4 text-right select-none" style={{ color: '#858585', minWidth: '2rem' }}>
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          
          {/* Code content */}
          <div className="flex-1 overflow-hidden">
            {lines.map((line, lineIndex) => {
              const tokens = tokenizeLine(line)
              const isLastLine = lineIndex === lines.length - 1
              
              return (
                <div key={lineIndex} className="whitespace-pre">
                  {tokens.map((token, tokenIndex) => (
                    <span key={tokenIndex} style={{ color: token.color }}>
                      {token.text}
                    </span>
                  ))}
                  {isLastLine && (
                    <span 
                      style={{ 
                        color: '#00FF41',
                        opacity: cursorVisible ? 1 : 0,
                        transition: 'opacity 0.1s'
                      }}
                    >
                      █
                    </span>
                  )}
                  {line === '' && !isLastLine && '\u00A0'}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#007ACC] text-white text-xs">
        <div className="flex items-center gap-4">
          <span>Python 3.11</span>
          <span>Aiera Production</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>
    </motion.div>
  )
}
