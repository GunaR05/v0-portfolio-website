"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { Download, ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo, useRef } from "react"
import { SystemArchitectureCard } from "./system-architecture-card"

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
  keyword: "#025EC4",
  class: "#00E5C3",
  string: "#0ECCED",
  comment: "#93C5E8",
  method: "#0ECCED",
  plain: "inherit",
}

// Matrix rain characters
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|;:,./<>?".split("")

// Matrix Rain Column component
function MatrixColumn({ x, delay }: { x: number; delay: number }) {
  const chars = useMemo(() => 
    Array.from({ length: 15 }, () => matrixChars[Math.floor(Math.random() * matrixChars.length)]),
    []
  )
  const duration = useMemo(() => 3 + Math.random() * 3, [])

  return (
    <motion.div
      className="absolute text-[#0ECCED] text-xs font-mono opacity-[0.04] pointer-events-none select-none"
      style={{ left: `${x}%` }}
      initial={{ y: -200 }}
      animate={{ y: "100vh" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {chars.map((char, i) => (
        <div key={i} className="leading-4">{char}</div>
      ))}
    </motion.div>
  )
}

// Badge Sparkle component
function BadgeSparkle({ delay }: { delay: number }) {
  const positions = useMemo(() => ({
    x: -20 + Math.random() * 140,
    y: -10 + Math.random() * 30
  }), [])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: positions.x, top: positions.y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180]
      }}
      transition={{
        duration: 1,
        delay,
        repeat: Infinity,
        repeatDelay: 2 + Math.random()
      }}
    >
      <Sparkles className="w-3 h-3 text-[#0ECCED]" />
    </motion.div>
  )
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

// Magnetic button hook
function useMagneticHover(strength: number = 25) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / rect.width * strength
    const deltaY = (e.clientY - centerY) / rect.height * strength
    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, springX, springY, handleMouseMove, handleMouseLeave }
}

export function Hero() {
  const { displayText, isComplete } = useTypewriter(
    "Senior Software Engineer & Applied AI Systems Engineer",
    60,
    800
  )
  
  const yearsCount = useCounter(5, 1500, 1200)
  const reqCount = useCounter(10, 1500, 1400)
  const companiesCount = useCounter(4, 1500, 1600)

  const [visibleLines, setVisibleLines] = useState(0)

  // Matrix rain columns
  const matrixColumns = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i / 20) * 100,
      delay: Math.random() * 5
    })),
    []
  )

  // Badge sparkles
  const sparkles = useMemo(() => [
    { id: 1, delay: 0 },
    { id: 2, delay: 1 },
    { id: 3, delay: 2 }
  ], [])

  // Magnetic buttons
  const viewWorkMagnetic = useMagneticHover(25)
  const downloadCVMagnetic = useMagneticHover(20)

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
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixColumns.map((col) => (
          <MatrixColumn key={col.id} x={col.x} delay={col.delay} />
        ))}
      </div>

      {/* Background pulse animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(14,204,237,0.05) 0%, transparent 70%)"
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* FULL HERO BACKGROUND - Animated RAG Pipeline Visualization (RIGHT SIDE ONLY) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" style={{ zIndex: 0 }}>
        <defs>
          <filter id="rag-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* LEFT SIDE - Data Sources (4 glowing boxes) - MOVED TO RIGHT */}
        {["Data", "Docs", "APIs", "Events"].map((label, i) => {
          const y = 150 + i * 150
          const x = 800  // Moved to right side
          return (
            <g key={`source-${i}`}>
              {/* Glowing box with pulse - 40% smaller */}
              <motion.rect
                x={x}
                y={y}
                width="72"
                height="36"
                rx="4"
                fill="rgba(14,204,237,0.08)"
                stroke="#0ECCED"
                strokeWidth="1"
                opacity="0.08"
                filter="url(#node-glow)"
                style={{
                  animation: `glow-pulse 3s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                } as any}
              />
              {/* Label - smaller font */}
              <text x={x + 36} y={y + 23} textAnchor="middle" fill="#0ECCED" fontSize="8" fontWeight="600" fontFamily="monospace" opacity="0.1">
                {label}
              </text>
              
              {/* Connecting lines to center with traveling dots */}
              {[0, 1, 2].map((dotIdx) => (
                <g key={`dot-${i}-${dotIdx}`}>
                  {/* Dashed line to center */}
                  <line x1={x} y1={y + 18} x2="900" y2="350" stroke="rgba(14,204,237,0.2)" strokeWidth="1" strokeDasharray="5,5" opacity="0.06" />
                  {/* Traveling dot */}
                  <motion.circle
                    cx={x}
                    cy={y + 18}
                    r="2.4"
                    fill="#0ECCED"
                    opacity="0.08"
                    filter="url(#rag-glow)"
                    animate={{ cx: [x, "900"], cy: [y + 18, "350"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: dotIdx * 0.6
                    } as any}
                  />
                </g>
              ))}
            </g>
          )
        })}

        {/* CENTER - Processing Nodes (Hexagons) - MOVED RIGHT, 40% SMALLER */}
        {[
          { cx: 900, cy: 200, label: "Embed", size: 24 },
          { cx: 900, cy: 350, label: "Vector DB", size: 30 },
          { cx: 900, cy: 500, label: "BM25", size: 24 }
        ].map((node, i) => {
          const points = Array.from({ length: 6 }, (_, j) => {
            const angle = (j * 60 * Math.PI) / 180
            const x = node.cx + node.size * Math.cos(angle)
            const y = node.cy + node.size * Math.sin(angle)
            return `${x},${y}`
          }).join(" ")
          
          return (
            <g key={`node-${i}`}>
              {/* Hexagon - reduced opacity */}
              <motion.polygon
                points={points}
                fill={i === 1 ? "rgba(14,204,237,0.08)" : "rgba(14,204,237,0.08)"}
                stroke="#0ECCED"
                strokeWidth="1"
                opacity="0.08"
                filter="url(#node-glow)"
                style={{
                  animation: `glow-pulse ${i === 1 ? 2.5 : 3.5}s ease-in-out infinite`
                } as any}
              />
              {/* Label - smaller font, reduced opacity */}
              <text x={node.cx} y={node.cy + 3} textAnchor="middle" fill="#0ECCED" fontSize="7" fontWeight="700" fontFamily="monospace" opacity="0.1">
                {node.label}
              </text>

              {/* Connecting lines to next node with traveling dots */}
              {i < 2 && (
                <g key={`connection-${i}`}>
                  {[0, 1, 2, 3].map((dotIdx) => (
                    <g key={`dot-connection-${dotIdx}`}>
                      {/* Dashed line */}
                      <line x1={node.cx} y1={node.cy + node.size + 3} x2="900" y2={[350, 500][i]} stroke="rgba(14,204,237,0.2)" strokeWidth="1" strokeDasharray="5,5" opacity="0.06" />
                      {/* Traveling dot */}
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy + node.size + 3}
                        r="2.4"
                        fill="#0ECCED"
                        opacity="0.08"
                        filter="url(#rag-glow)"
                        animate={{ cy: [node.cy + node.size + 3, [350, 500][i]] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: dotIdx * 0.6
                        } as any}
                      />
                    </g>
                  ))}
                </g>
              )}
            </g>
          )
        })}

        {/* RIGHT SIDE - LLM Node + Output */}
        {/* Large LLM Brain node - 40% smaller */}
        <motion.circle
          cx="1050"
          cy="350"
          r="42"
          fill="rgba(123,97,255,0.08)"
          stroke="#025EC4"
          strokeWidth="1"
          opacity="0.08"
          filter="url(#node-glow)"
          style={{
            animation: `glow-pulse 2s ease-in-out infinite`
          } as any}
        />
        {/* LLM Label - smaller, reduced opacity */}
        <text x="1050" y="354" textAnchor="middle" fill="#025EC4" fontSize="8" fontWeight="700" fontFamily="monospace" opacity="0.1">
          LLM
        </text>

        {/* Lines from center nodes to LLM */}
        {[200, 350, 500].map((cy, i) => (
          <g key={`to-llm-${i}`}>
            {[0, 1, 2].map((dotIdx) => (
              <g key={`dot-llm-${dotIdx}`}>
                {/* Dashed line */}
                <line x1="930" y1={cy} x2="1008" y2="350" stroke="rgba(123,97,255,0.2)" strokeWidth="1" strokeDasharray="5,5" opacity="0.06" />
                {/* Traveling dot */}
                <motion.circle
                  cx="930"
                  cy={cy}
                  r="2.4"
                  fill="#025EC4"
                  opacity="0.08"
                  filter="url(#rag-glow)"
                  animate={{ cx: ["930", "1008"], cy: [cy, "350"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: dotIdx * 0.6
                  } as any}
                />
              </g>
            ))}
          </g>
        ))}

        {/* Output Response box - 40% smaller */}
        <motion.rect
          x="1150"
          y="325"
          width="84"
          height="50"
          rx="4"
          fill="rgba(123,97,255,0.08)"
          stroke="#025EC4"
          strokeWidth="1"
          opacity="0.08"
          filter="url(#node-glow)"
          style={{
            animation: `glow-pulse 2.5s ease-in-out infinite`
          } as any}
        />
        {/* Output Label - smaller, reduced opacity */}
        <text x="1192" y="355" textAnchor="middle" fill="#025EC4" fontSize="7" fontWeight="600" fontFamily="monospace" opacity="0.1">
          Response
        </text>

        {/* Line from LLM to Output with traveling dots */}
        {[0, 1, 2, 3].map((dotIdx) => (
          <g key={`output-dot-${dotIdx}`}>
            {/* Dashed line */}
            <line x1="1092" y1="350" x2="1150" y2="350" stroke="rgba(123,97,255,0.2)" strokeWidth="1" strokeDasharray="5,5" opacity="0.06" />
            {/* Traveling dot */}
            <motion.circle
              cx="1092"
              cy="350"
              r="2.4"
              fill="#025EC4"
              opacity="0.08"
              filter="url(#rag-glow)"
              animate={{ cx: ["1092", "1150"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: dotIdx * 0.4
              } as any}
            />
          </g>
        ))}
      </svg>

      {/* Breathing scale animation for entire visualization */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
          {/* Left content — min 45% on desktop, full width on mobile */}
          <div className="space-y-8 w-full lg:min-w-[45%] lg:max-w-[55%]">
            {/* Availability badge with sparkles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              {/* Sparkles around badge */}
              {sparkles.map((sparkle) => (
                <BadgeSparkle key={sparkle.id} delay={sparkle.delay} />
              ))}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">Available for Opportunities</span>
            </motion.div>

            {/* Main heading with clip-path reveal */}
            <div>
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-poppins)] leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Gunashree
                </motion.span>
                <br />
                <motion.span
                  className="inline-block gradient-text"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  Rajakumar
                </motion.span>
              </motion.h1>
            </div>

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
              I build AI systems that work in the real world, not just in notebooks. 
              5+ years shipping production-grade ML infrastructure, LLM-powered agentic systems, 
              and distributed backends across fintech, e-commerce, telecom, and ride-hailing at scale.
            </motion.p>

            {/* CTA buttons with magnetic hover and animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {/* View My Work - Animated gradient button */}
              <motion.div
                ref={viewWorkMagnetic.ref}
                style={{ x: viewWorkMagnetic.springX, y: viewWorkMagnetic.springY }}
                onMouseMove={viewWorkMagnetic.handleMouseMove}
                onMouseLeave={viewWorkMagnetic.handleMouseLeave}
              >
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="relative overflow-hidden text-white font-semibold group"
                >
                  {/* Animated gradient background */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#0ECCED] via-[#025EC4] to-[#0ECCED] bg-[size:200%_100%]"
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              {/* Download CV - Border trace animation */}
              <motion.div
                ref={downloadCVMagnetic.ref}
                style={{ x: downloadCVMagnetic.springX, y: downloadCVMagnetic.springY }}
                onMouseMove={downloadCVMagnetic.handleMouseMove}
                onMouseLeave={downloadCVMagnetic.handleMouseLeave}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="relative overflow-hidden border-transparent hover:bg-muted group"
                  asChild
                >
                  <a href="https://drive.google.com/uc?export=download&id=1mjO0TQ3qORy1HZu-sOa1TC4cxfrm_XEb" download>
                    {/* Border trace animation */}
                    <span className="absolute inset-0 rounded-md">
                      <motion.span
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: "linear-gradient(90deg, #0ECCED, #025EC4, #0ECCED)",
                          backgroundSize: "200% 100%",
                          padding: "1px",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude"
                        }}
                        animate={{ backgroundPosition: ["0% center", "200% center"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </span>
                    <Download className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Download CV</span>
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats row — mobile only (stats also appear in code card on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex lg:hidden items-center justify-center gap-8 pt-2"
            >
              <div className="text-center">
                <span className="text-primary font-bold text-2xl">{yearsCount}+</span>
                <p className="text-muted-foreground text-xs mt-0.5">Years Exp.</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <span className="text-secondary font-bold text-2xl">{reqCount}K+</span>
                <p className="text-muted-foreground text-xs mt-0.5">Req/Min</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <span className="text-accent font-bold text-2xl">{companiesCount}</span>
                <p className="text-muted-foreground text-xs mt-0.5">Companies</p>
              </div>
            </motion.div>
          </div>

          {/* Right content - Code card — hidden on mobile, max 50% on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block relative lg:w-[50%] lg:flex-shrink-0"
          >
            {/* Animated data flow lines behind card */}
            <div className="absolute inset-0 -z-5 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={`line-${i}`} className="absolute w-full h-px" style={{ top: `${20 + i * 15}%`, backgroundColor: "rgba(14,204,237,0.1)" }}>
                  {[...Array(3)].map((_, dotIdx) => (
                    <motion.div
                      key={`dot-${dotIdx}`}
                      className="absolute w-1 h-1 bg-[#0ECCED] rounded-full"
                      style={{ boxShadow: "0 0 8px #0ECCED", top: "-1.5px" }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 2 + (dotIdx * 0.5),
                        repeat: Infinity,
                        ease: "linear",
                        delay: (dotIdx * 0.6) + (i * 0.1)
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Floating tech badges — desktop only, anchored to right side of card */}
            <div className="absolute inset-0 -z-5 pointer-events-none">
              {[
                { text: "PY",  top: "-30px",  right: "-20px" },
                { text: "AI",  top: "20%",    right: "-50px" },
                { text: "{}",  bottom: "80px", right: "-40px" },
                { text: "RAG", top: "50%",    right: "-60px" },
                { text: "LLM", bottom: "20px", right: "-45px" },
                { text: "API", top: "40%",    right: "-55px" }
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="absolute px-2 py-1 rounded border border-[#0ECCED] bg-background/50 text-xs font-mono text-[#0ECCED] backdrop-blur-sm"
                  style={{
                    top: badge.top,
                    bottom: (badge as any).bottom,
                    right: badge.right,
                    opacity: 0.6
                  }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3 + (idx * 0.3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.15
                  }}
                >
                  {badge.text}
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full"
            >
              {/* System Architecture Card */}
              <SystemArchitectureCard />

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
