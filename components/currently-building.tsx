'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { CheckCircle2, Database, Brain, FileText, ExternalLink, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CurrentlyBuilding() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const [terminalOutput, setTerminalOutput] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)

  const fullOutput = `> Analyzing market data...
> Processing 1,247 data points...
> Extracting key trends...

OUTPUT REPORT:
Market Intelligence Summary
Generated: April 2026

Top Trends Identified:
1. AI Engineering demand up 340%
2. RAG pipeline adoption accelerating
3. LLM infrastructure roles +180%

Key Insight: Senior AI Engineers with
production experience are rare.
Recommendation: Target companies
scaling ML infrastructure NOW.

> Analysis complete.
> Time: 2.3 seconds`

  // Terminal typing effect
  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < fullOutput.length) {
        setTerminalOutput(fullOutput.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        currentIndex = 0
        setTerminalOutput('')
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isInView])

  // Cursor blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)
    return () => clearInterval(blinkInterval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(17,34,54,0.6), rgba(13,27,42,0.8))'
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,194,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-[rgba(0,194,255,0.15)] border border-[#00C2FF]">
              Currently Building
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-2"
          >
            What I&apos;m actively shipping right now
          </motion.h2>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16 p-8 rounded-2xl border border-[rgba(0,194,255,0.3)] shadow-[inset_0_0_32px_rgba(0,194,255,0.08)]"
          style={{
            background: 'linear-gradient(135deg, rgba(13,27,42,0.9), rgba(26,60,94,0.6))'
          }}
        >
          {/* Left Side */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <span className="px-2.5 py-1 rounded-full text-xs font-bold text-[#00C2FF] bg-[rgba(0,194,255,0.15)] border border-[#00C2FF]">
                  Madison AI Tool
                </span>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00FF00]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold text-[#00FF00]">LIVE</span>
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
                Market Intelligence System
              </h3>

              {/* Description */}
              <p className="text-sm text-[#8BA3BC] mb-6 leading-relaxed">
                An AI-powered intelligence system that transforms raw workforce and market data into structured, decision-ready insights in seconds, reducing manual research time by over 80%.
              </p>

              {/* Feature Bullets */}
              <ul className="space-y-3 mb-8">
                {[
                  'Real-time market trend extraction from noisy datasets',
                  'LLM-powered insight synthesis and summarization',
                  'Structured executive-ready intelligence reports',
                  '45 minute research compressed to under 3 minutes'
                ].map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  className="bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] text-white hover:shadow-lg hover:shadow-[#00C2FF]/50 transition-shadow"
                  size="lg"
                >
                  View Live Demo
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#00C2FF] text-[#00C2FF] hover:bg-[rgba(0,194,255,0.1)]"
                  size="lg"
                >
                  See How It Works
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#0A0F1A] rounded-lg p-4 border border-[rgba(0,194,255,0.2)] font-mono text-sm overflow-hidden"
          >
            <pre className="text-[#00FF00] whitespace-pre-wrap break-words">
              {terminalOutput}
              {cursorVisible && <span className="animate-pulse">_</span>}
            </pre>
          </motion.div>
        </motion.div>

        {/* 3-Step Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {[
              { icon: Database, title: 'Raw Data Input', description: 'Market signals and workforce data' },
              { icon: Brain, title: 'AI Analysis Engine', description: 'LLM-powered synthesis' },
              { icon: FileText, title: 'Structured Report', description: 'Executive-ready insights' }
            ].map((item, i) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="relative"
                >
                  {/* Arrow to next step */}
                  {i < 2 && (
                    <div className="hidden md:flex absolute top-1/2 -right-[calc(1.5rem+0.5px)] transform -translate-y-1/2 z-20">
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 text-[#00C2FF]" />
                      </motion.div>
                    </div>
                  )}

                  <div className="p-6 rounded-lg border border-[#00C2FF] bg-[rgba(0,194,255,0.05)] hover:bg-[rgba(0,194,255,0.1)] transition-colors">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white text-center mb-2">{item.title}</h4>
                    <p className="text-xs text-[#8BA3BC] text-center">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
