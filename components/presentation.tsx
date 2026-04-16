'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Presentation() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrent((prev) => {
      const next = prev + newDirection
      return next < 0 ? 9 : next > 9 ? 0 : next
    })
  }

  const containerClass = 'w-full h-full bg-gradient-to-br from-[#0D1B2A] via-[#0F2236] to-[#0D1B2A] rounded-lg overflow-hidden relative'

  return (
    <div className="w-full h-screen bg-[#0D1B2A] flex flex-col items-center justify-center p-4">
      {/* Presentation Container */}
      <div className="w-full max-w-5xl aspect-video bg-[#0D1B2A] rounded-xl shadow-2xl overflow-hidden border border-[rgba(0,194,255,0.2)]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {current === 0 && (
            <motion.div
              key="slide-0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 1: Brand Introduction */}
              <div className="relative w-full h-full flex flex-col items-center justify-center px-12">
                {/* Animated gradient glow */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(0,194,255,0.3) 0%, transparent 60%)',
                      'radial-gradient(circle at 80% 50%, rgba(123,97,255,0.3) 0%, transparent 60%)',
                      'radial-gradient(circle at 20% 50%, rgba(0,194,255,0.3) 0%, transparent 60%)',
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  <h1 className="text-7xl font-black text-white text-center mb-8 tracking-tight">
                    Gunashree Rajakumar
                  </h1>
                </motion.div>

                {/* Typewriter effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="relative z-10 max-w-2xl mb-8"
                >
                  <p className="text-2xl text-[#00C2FF] text-center font-bold">
                    I turn AI demos into production systems that scale.
                  </p>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-[#8BA3BC] text-center mb-12 relative z-10"
                >
                  Software Engineer @ Aiera | MS CS Northeastern | Boston
                </motion.p>

                {/* Animated badge pills */}
                <motion.div className="flex gap-4 flex-wrap justify-center relative z-10">
                  {['5+ Years', '10K+ Req/Min', 'Wall Street Clients', 'Aiera × Anthropic'].map((badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      className="px-4 py-2 border border-[#00C2FF] rounded-full text-[#00C2FF] text-sm font-semibold"
                    >
                      {badge}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Bottom right glow orb */}
                <motion.div
                  className="absolute bottom-8 right-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] opacity-20 blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}

          {current === 1 && (
            <motion.div
              key="slide-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 2: Target Audience */}
              <div className="w-full h-full p-12 flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-black text-white mb-12"
                >
                  Who I&apos;m Talking To
                </motion.h2>

                <div className="flex gap-8 flex-1">
                  {[
                    { title: 'Recruiters', color: '#00C2FF' },
                    { title: 'Engineering Managers', color: '#7B61FF' },
                  ].map((persona, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.2 }}
                      className="flex-1 bg-white/5 backdrop-blur-md border p-6 rounded-xl"
                      style={{ borderColor: `${persona.color}40` }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-4">{persona.title}</h3>
                      <ul className="space-y-2 text-[#8BA3BC]">
                        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.2 }}>
                          • Looking for proven AI systems expertise
                        </motion.li>
                        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.2 }}>
                          • Need production-ready engineering
                        </motion.li>
                        <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.2 }}>
                          • Value scale & reliability
                        </motion.li>
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {current === 2 && (
            <motion.div
              key="slide-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 3: UVP + Brand Pillars */}
              <div className="w-full h-full p-12 flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border-l-4 border-[#00C2FF] pl-6 mb-12"
                >
                  <p className="text-2xl text-[#00C2FF] font-semibold">
                    Systems that scale. Code that ships. AI that works.
                  </p>
                </motion.div>

                <div className="grid grid-cols-3 gap-6 flex-1">
                  {[
                    { num: '01', title: 'Systems Thinking', icon: '🧠' },
                    { num: '02', title: 'AI Integration', icon: '⚡' },
                    { num: '03', title: 'Execution Speed', icon: '🚀' },
                  ].map((pillar, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-[#00C2FF]/30 p-6 rounded-xl hover:border-[#00C2FF] transition-all"
                    >
                      <div className="text-4xl mb-3">{pillar.icon}</div>
                      <p className="text-[#00C2FF] text-sm font-bold">{pillar.num}</p>
                      <h3 className="text-xl font-bold text-white mt-2">{pillar.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {current === 3 && (
            <motion.div
              key="slide-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 4: Visual Identity */}
              <div className="w-full h-full p-12 flex flex-col items-center justify-center">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-4xl font-bold text-white mb-12"
                >
                  Visual Identity
                </motion.h2>

                <div className="flex gap-12 items-center mb-12">
                  {[
                    { color: '#00C2FF', label: 'Cyan' },
                    { color: '#7B61FF', label: 'Violet' },
                    { color: '#0D1B2A', label: 'Navy' },
                  ].map((swatch, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="text-center"
                    >
                      <div
                        className="w-24 h-24 rounded-full mb-3 shadow-lg"
                        style={{ backgroundColor: swatch.color }}
                      />
                      <p className="text-white font-semibold">{swatch.label}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-6 py-3 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] rounded-full"
                >
                  <p className="text-white font-bold">Hero + Sage Archetype</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {current === 4 && (
            <motion.div
              key="slide-4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 5: Website Showcase */}
              <div className="w-full h-full p-12 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-2xl bg-white/5 backdrop-blur-md border-4 border-[#00C2FF] rounded-lg overflow-hidden shadow-2xl"
                >
                  <div className="bg-[#1A2A3A] p-4 border-b border-[#00C2FF]/20">
                    <p className="text-[#00C2FF] text-sm font-mono">v0-portfolio-website-woad-two.vercel.app</p>
                  </div>
                  <div className="p-8 h-96 bg-gradient-to-br from-[#0D1B2A] to-[#1A3C5E] flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-4xl font-black text-white mb-4">Gunashree Rajakumar</p>
                      <p className="text-[#00C2FF]">AI Systems Engineer</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {current === 5 && (
            <motion.div
              key="slide-5"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 6: Projects */}
              <div className="w-full h-full p-12 flex flex-col">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-4xl font-bold text-white mb-8"
                >
                  Best Work — Real Systems
                </motion.h2>

                <div className="space-y-4 flex-1">
                  {[
                    { name: 'RAG Platform', company: 'Aiera', metrics: ['10,000+ req/min', '35% latency reduction'], color: '#00C2FF' },
                    { name: 'Fraud Detection', company: 'Airtel', metrics: ['Sub-50ms', 'Millions daily'], color: '#7B61FF' },
                    { name: 'Flipkart ML', company: 'Flipkart', metrics: ['3x throughput', '110+ orders/sec'], color: '#00E5C3' },
                  ].map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="border-l-4 p-4 rounded flex justify-between items-center"
                      style={{ borderColor: project.color }}
                    >
                      <div>
                        <h3 className="text-white font-bold text-lg">{project.name}</h3>
                        <p className="text-[#8BA3BC] text-sm">{project.company}</p>
                      </div>
                      <div className="flex gap-3">
                        {project.metrics.map((metric, j) => (
                          <span key={j} className="px-3 py-1 bg-white/5 text-[#00C2FF] text-xs rounded-full border border-[#00C2FF]/30">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {current === 6 && (
            <motion.div
              key="slide-6"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 7: Story Title */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-8xl font-black text-[#00C2FF] mb-8"
                >
                  "
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white text-center max-w-2xl mb-8"
                >
                  From Writing Code → Building Intelligent Systems
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-6 py-2 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] rounded-full"
                >
                  <p className="text-white text-sm font-bold">Framework: Hero's Journey</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {current === 7 && (
            <motion.div
              key="slide-7"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 8: Story Flow */}
              <div className="w-full h-full p-12 flex flex-col justify-center">
                <div className="flex gap-12 items-center justify-center mb-12 flex-1">
                  {[
                    { title: 'BEFORE', desc: 'Demos that don\'t ship', op: 0.5 },
                    { title: 'TURNING POINT', desc: 'Production focus', op: 1 },
                    { title: 'AFTER', desc: 'Systems at scale', op: 1 },
                  ].map((stage, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.15 }}
                      className="text-center flex-1"
                      style={{ opacity: stage.op }}
                    >
                      <div className="text-3xl font-black text-white mb-2">{stage.title}</div>
                      <p className={i === 1 ? 'text-[#00C2FF]' : 'text-[#8BA3BC]'}>{stage.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-[#00C2FF] text-xl italic max-w-2xl mx-auto"
                >
                  "The gap between AI demos and production systems — that's where I live."
                </motion.p>
              </div>
            </motion.div>
          )}

          {current === 8 && (
            <motion.div
              key="slide-8"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 9: Madison Tool */}
              <div className="w-full h-full p-12 flex flex-col">
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Aiera × Anthropic — Live in Production
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-[#8BA3BC] mb-8"
                >
                  Real-time AI Integration
                </motion.p>

                <div className="grid grid-cols-3 gap-6 mb-8 flex-1">
                  {[
                    { icon: '🧠', title: 'Real-time Intelligence' },
                    { icon: '⚡', title: 'MCP Architecture' },
                    { icon: '📊', title: '45K+ Events' },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-white/5 backdrop-blur-md border border-[#00C2FF]/30 p-4 rounded-lg"
                    >
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <p className="text-white font-semibold text-sm">{feature.title}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-[#1A2A3A] border border-[#00C2FF]/30 rounded-lg p-4 mb-4 font-mono text-[#00C2FF] text-sm"
                >
                  <p>$ Connecting Claude to Wall Street...</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-[#00C2FF] font-bold text-center mb-4"
                >
                  45 minutes of research → under 3 minutes
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full w-fit mx-auto"
                >
                  <p className="text-green-400 font-bold text-sm">LIVE IN PRODUCTION</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {current === 9 && (
            <motion.div
              key="slide-9"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className={containerClass}
            >
              {/* Slide 10: Close */}
              <div className="w-full h-full flex flex-col items-center justify-center p-12">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring' }}
                  className="text-8xl font-black text-white mb-12 text-center"
                >
                  Ship it.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-[#8BA3BC] text-center max-w-xl mb-12"
                >
                  Systems That Scale — in production, not just in demos.
                </motion.p>

                <motion.div
                  className="space-y-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-[#00C2FF] font-semibold">gunashree.rajakumar@gmail.com</p>
                  <p className="text-[#8BA3BC] text-sm">Boston, MA</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={() => paginate(-1)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-[#00C2FF]" />
        </button>

        <span className="text-[#8BA3BC] font-mono text-sm min-w-12 text-center">
          {String(current + 1).padStart(2, '0')} / 10
        </span>

        <button
          onClick={() => paginate(1)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-[#00C2FF]" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-[#00C2FF]' : 'w-2 bg-[#1A3A55]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
