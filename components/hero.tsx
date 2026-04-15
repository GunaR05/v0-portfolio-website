"use client"

import { motion } from "framer-motion"
import { Download, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// Pre-tokenized code lines to avoid hydration issues with regex
const codeLines = [
  { lineNum: 1, tokens: [{ text: "from", type: "keyword" }, { text: " langchain ", type: "plain" }, { text: "import", type: "keyword" }, { text: " OpenAI", type: "class" }] },
  { lineNum: 2, tokens: [{ text: "from", type: "keyword" }, { text: " opensearch ", type: "plain" }, { text: "import", type: "keyword" }, { text: " OpenSearch", type: "class" }] },
  { lineNum: 3, tokens: [] },
  { lineNum: 4, tokens: [{ text: "class", type: "keyword" }, { text: " RAGPipeline", type: "class" }, { text: ":", type: "plain" }] },
  { lineNum: 5, tokens: [{ text: "    ", type: "plain" }, { text: "def", type: "keyword" }, { text: " __init__", type: "method" }, { text: "(", type: "plain" }, { text: "self", type: "keyword" }, { text: "):", type: "plain" }] },
  { lineNum: 6, tokens: [{ text: "        ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".llm = OpenAI", type: "class" }, { text: "(model=", type: "plain" }, { text: '"claude-3"', type: "string" }, { text: ")", type: "plain" }] },
  { lineNum: 7, tokens: [{ text: "        ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".vectordb = OpenSearch", type: "class" }, { text: "()", type: "plain" }] },
  { lineNum: 8, tokens: [] },
  { lineNum: 9, tokens: [{ text: "    ", type: "plain" }, { text: "async", type: "keyword" }, { text: " ", type: "plain" }, { text: "def", type: "keyword" }, { text: " hybrid_search", type: "method" }, { text: "(", type: "plain" }, { text: "self", type: "keyword" }, { text: ", query: str):", type: "plain" }] },
  { lineNum: 10, tokens: [{ text: "        ", type: "plain" }, { text: "# BM25 + vector search", type: "comment" }] },
  { lineNum: 11, tokens: [{ text: "        bm25 = ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".vectordb.bm25", type: "method" }, { text: "(query)", type: "plain" }] },
  { lineNum: 12, tokens: [{ text: "        vector = ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".vectordb.vector", type: "method" }, { text: "(query)", type: "plain" }] },
  { lineNum: 13, tokens: [{ text: "        ", type: "plain" }, { text: "return", type: "keyword" }, { text: " ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".rerank", type: "method" }, { text: "(bm25, vector)", type: "plain" }] },
  { lineNum: 14, tokens: [] },
  { lineNum: 15, tokens: [{ text: "    ", type: "plain" }, { text: "async", type: "keyword" }, { text: " ", type: "plain" }, { text: "def", type: "keyword" }, { text: " generate", type: "method" }, { text: "(", type: "plain" }, { text: "self", type: "keyword" }, { text: ", context):", type: "plain" }] },
  { lineNum: 16, tokens: [{ text: "        ", type: "plain" }, { text: "return", type: "keyword" }, { text: " ", type: "plain" }, { text: "self", type: "keyword" }, { text: ".llm.generate", type: "method" }, { text: "(context)", type: "plain" }] },
]

const tokenColors: Record<string, string> = {
  keyword: "#7B61FF",
  class: "#00E5C3",
  string: "#00C2FF",
  comment: "#8BA3BC",
  method: "#00C2FF",
  plain: "inherit",
}

// Typewriter hook
function useTypewriter(text: string, speed: number = 50, delay: number = 0) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let charIndex = 0

    const startTyping = () => {
      if (charIndex < text.length) {
        setDisplayText(text.slice(0, charIndex + 1))
        charIndex++
        timeout = setTimeout(startTyping, speed)
      } else {
        setIsComplete(true)
      }
    }

    const delayTimeout = setTimeout(startTyping, delay)

    return () => {
      clearTimeout(timeout)
      clearTimeout(delayTimeout)
    }
  }, [text, speed, delay])

  return { displayText, isComplete }
}

// Counter hook for count-up animation
function useCounter(target: number, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const startAnimation = () => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * target))
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const delayTimeout = setTimeout(startAnimation, delay)

    return () => {
      clearTimeout(delayTimeout)
      cancelAnimationFrame(animationFrame)
    }
  }, [target, duration, delay])

  return count
}

export function Hero() {
  const { displayText, isComplete } = useTypewriter(
    "Senior Software Engineer & Applied AI Systems Engineer",
    40,
    800
  )
  
  const yearsCount = useCounter(5, 1500, 1200)
  const reqCount = useCounter(10, 1500, 1400)
  const companiesCount = useCounter(4, 1500, 1600)

  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < codeLines.length) return prev + 1
        clearInterval(interval)
        return prev
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background" />
      <div className="absolute inset-0 radial-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">Available for Opportunities</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-poppins)] leading-tight">
                Gunashree
                <br />
                <span className="gradient-text">Rajakumar</span>
              </h1>
            </motion.div>

            {/* Subtitle with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary font-semibold h-8"
            >
              <span>{displayText}</span>
              <span className={`cursor-blink ${isComplete ? 'opacity-0' : ''}`}>|</span>
            </motion.div>

            {/* UVP paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              I build AI systems that work in the real world — not just in notebooks. 
              5+ years shipping production-grade ML infrastructure, LLM-powered agentic systems, 
              and distributed backends across fintech, e-commerce, telecom, and ride-hailing at scale.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted"
                asChild
              >
                <a href="https://drive.google.com/uc?export=download&id=1mjO0TQ3qORy1HZu-sOa1TC4cxfrm_XEb" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right content - Code card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                {/* Code header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-muted-foreground font-mono">rag_pipeline.py</span>
                </div>
                
                {/* Code content with animated lines */}
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>
                    {codeLines.map((line, lineIndex) => (
                      <motion.div 
                        key={line.lineNum} 
                        className="leading-6"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: lineIndex < visibleLines ? 1 : 0,
                          x: lineIndex < visibleLines ? 0 : -10
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-muted-foreground mr-4 select-none">
                          {String(line.lineNum).padStart(2, " ")}
                        </span>
                        {line.tokens.length === 0 ? (
                          <span>&nbsp;</span>
                        ) : (
                          line.tokens.map((token, idx) => (
                            <span key={idx} style={{ color: tokenColors[token.type] }}>
                              {token.text}
                            </span>
                          ))
                        )}
                        {/* Green cursor on current line */}
                        {lineIndex === visibleLines - 1 && visibleLines < codeLines.length && (
                          <span className="cursor-blink text-green-500 ml-1">|</span>
                        )}
                      </motion.div>
                    ))}
                  </code>
                </pre>

                {/* Stats row with count-up animation */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <span className="text-primary font-bold text-lg">{yearsCount}+</span>
                      <p className="text-muted-foreground text-xs">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <span className="text-secondary font-bold text-lg">{reqCount}K+</span>
                      <p className="text-muted-foreground text-xs">Req/Min</p>
                    </div>
                    <div className="text-center">
                      <span className="text-accent font-bold text-lg">{companiesCount}</span>
                      <p className="text-muted-foreground text-xs">Companies</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
