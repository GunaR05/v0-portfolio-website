"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { Download, ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useMemo, useRef } from "react"

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
      className="absolute text-[#00C2FF] text-xs font-mono opacity-[0.04] pointer-events-none select-none"
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
      <Sparkles className="w-3 h-3 text-[#00C2FF]" />
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
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
          background: "radial-gradient(circle, rgba(0,194,255,0.05) 0%, transparent 70%)"
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating gradient orbs - LARGER and MORE VISIBLE */}
      <motion.div 
        className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[rgba(0,194,255,0.12)] to-transparent blur-[100px] pointer-events-none orb-float-1"
      />
      <motion.div 
        className="absolute -bottom-20 right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[rgba(123,97,255,0.12)] to-transparent blur-[80px] pointer-events-none orb-float-2"
      />
      <motion.div 
        className="absolute top-1/2 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[rgba(0,229,195,0.08)] to-transparent blur-[60px] pointer-events-none orb-float-3"
      />

      {/* Background grid and glow */}
      <div className="absolute inset-0 grid-background" />
      <div className="absolute inset-0 radial-glow" />

      {/* ANIMATION 1: Animated Circuit Board Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="circuit-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Horizontal and vertical grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h-line-${i}`} x1="0" y1={i * 80} x2="1200" y2={i * 80} stroke="rgba(0,194,255,0.08)" strokeWidth="1" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`v-line-${i}`} x1={i * 80} y1="0" x2={i * 80} y2="800" stroke="rgba(0,194,255,0.08)" strokeWidth="1" />
        ))}
        {/* Node dots at intersections */}
        {Array.from({ length: 12 }).map((_, i) =>
          Array.from({ length: 15 }).map((_, j) => (
            <circle key={`node-${i}-${j}`} cx={j * 80} cy={i * 80} r="3" fill="rgba(0,194,255,0.15)" filter="url(#circuit-glow)" />
          ))
        )}
        {/* Glowing data packets traveling along lines */}
        {Array.from({ length: 7 }).map((_, i) => (
          <circle 
            key={`packet-${i}`} 
            r="4" 
            fill="#00C2FF" 
            opacity="0.8"
            filter="url(#circuit-glow)"
            style={{
              offsetPath: `path('M 0,${(i % 4) * 200 + 100} L 1200,${(i % 4) * 200 + 100}')`,
              animation: `packet-flow ${2 + (i % 3) * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`
            } as any}
          />
        ))}
      </svg>

      {/* ANIMATION 2: Animated Rings behind "Gunashree" name */}
      <svg className="absolute top-[200px] left-[10%] w-[400px] h-[400px] pointer-events-none" viewBox="0 0 400 400">
        <defs>
          <filter id="ring-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Concentric radar rings */}
        {[0, 1].map((i) => (
          <circle 
            key={`ring-${i}`}
            cx="200" 
            cy="200" 
            r="100"
            fill="none"
            stroke="rgba(0,194,255,0.08)" 
            strokeWidth="1"
            className="radar-ring"
            filter="url(#ring-glow)"
            style={{
              animation: `radar-pulse ${4}s ease-out infinite`,
              animationDelay: `${i * 2}s`
            } as any}
          />
        ))}
      </svg>

      {/* ANIMATION 3: Shooting Stars effect */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none shooting-star"
          style={{
            width: "150px",
            height: "1px",
            background: "linear-gradient(90deg, rgba(0,194,255,0.4), transparent)",
            top: `${20 + i * 20}%`,
            left: "-150px",
            animation: `shoot-star ${1.5}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
            filter: "blur(0.5px)"
          }}
        />
      ))}
      
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
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
                    className="absolute inset-0 bg-gradient-to-r from-[#00C2FF] via-[#7B61FF] to-[#00C2FF] bg-[size:200%_100%]"
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
                          background: "linear-gradient(90deg, #00C2FF, #7B61FF, #00C2FF)",
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
          </div>

          {/* Right content - Code card with animated background */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Animated data flow lines behind card */}
            <div className="absolute inset-0 -z-5 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={`line-${i}`} className="absolute w-full h-px" style={{ top: `${20 + i * 15}%`, backgroundColor: "rgba(0,194,255,0.1)" }}>
                  {/* Glowing dots flowing along line */}
                  {[...Array(3)].map((_, dotIdx) => (
                    <motion.div
                      key={`dot-${dotIdx}`}
                      className="absolute w-1 h-1 bg-[#00C2FF] rounded-full"
                      style={{
                        boxShadow: "0 0 8px #00C2FF",
                        top: "-1.5px"
                      }}
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

            {/* Floating tech badges around card */}
            <div className="absolute inset-0 -z-5 pointer-events-none">
              {[
                { text: "PY", top: "-30px", left: "-40px" },
                { text: "AI", top: "50%", right: "-60px" },
                { text: "{}", bottom: "80px", left: "-50px" },
                { text: "RAG", top: "20px", right: "-70px" },
                { text: "LLM", bottom: "20px", right: "-50px" },
                { text: "API", top: "40%", left: "-60px" }
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="absolute px-2 py-1 rounded border border-[#00C2FF] bg-background/50 text-xs font-mono text-[#00C2FF] backdrop-blur-sm"
                  style={{
                    top: badge.top,
                    bottom: badge.bottom,
                    left: badge.left,
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
              className="relative"
            >
              {/* Grid wave pulse effect behind card */}
              <div className="absolute inset-0 -z-10 rounded-2xl grid-wave" style={{
                backgroundImage: 'linear-gradient(rgba(0, 194, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.03) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }} />

              {/* Code card with glow animation */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl card-glow">
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
                    <motion.div 
                      className="text-center"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-primary font-bold text-lg">{yearsCount}+</span>
                      <p className="text-muted-foreground text-xs">Years Experience</p>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-secondary font-bold text-lg">{reqCount}K+</span>
                      <p className="text-muted-foreground text-xs">Req/Min</p>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-accent font-bold text-lg">{companiesCount}</span>
                      <p className="text-muted-foreground text-xs">Companies</p>
                    </motion.div>
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
