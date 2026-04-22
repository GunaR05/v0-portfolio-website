'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BrandShowcaseCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  }

  const transition = { duration: 0.5, ease: 'easeInOut' }
  const exitTransition = { duration: 0.3 }

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Card Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[rgba(0,102,255,0.3)] shadow-[inset_0_0_32px_rgba(0,102,255,0.08)]">
        <AnimatePresence mode="wait">
          {/* CARD 0: Quote Card */}
          {currentSlide === 0 && (
            <motion.div
              key="card-0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              exitTransition={exitTransition}
              className="absolute inset-0 bg-gradient-to-br from-[#030812] to-[#020764] px-8 py-8 flex flex-col justify-between border border-[rgba(0,102,255,0.3)] overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(0,102,255,0.08), transparent 60%), linear-gradient(to bottom right, #030812, #020764)'
              }}
            >
              {/* Quote Mark */}
              <div className="text-[72px] font-bold bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent leading-none">
                "
              </div>

              {/* Main Quote Text with proper wrapping */}
              <div className="flex flex-col gap-4">
                <div className="text-base md:text-[22px] font-bold leading-tight bg-gradient-to-r from-white to-[#0066FF] bg-clip-text text-transparent pr-10 overflow-hidden break-words">
                  {["I", "turn", "AI", "demos", "into", "production", "systems", "that", "scale."].map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="inline mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>

                {/* Gradient Underline */}
                <motion.div
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0066FF] w-max"
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </div>

              {/* Bottom Row - Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(0,102,255,0.2)]">
                <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#0066FF] to-[#0066FF] flex-shrink-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white font-poppins">G</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Gunashree Rajakumar</p>
                  <p className="text-[10px] text-[#7BA4C7] font-mono">rajakumar.g@northeastern.edu</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CARD 1: Metrics Card */}
          {currentSlide === 1 && (
            <motion.div
              key="card-1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              exitTransition={exitTransition}
              className="absolute inset-0 bg-gradient-to-br from-[#030812] to-[#020764] px-10 py-10 flex flex-col justify-between border border-[rgba(0,102,255,0.3)] shadow-[inset_0_0_32px_rgba(0,102,255,0.08)]"
            >
              {/* Title */}
              <div>
                <h2 className="text-lg font-bold tracking-widest bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent">
                  IMPACT AT SCALE
                </h2>
              </div>

              {/* Metrics */}
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {[
                  { label: 'Users Served', value: '100M+', percent: 95, color: 'from-[#0066FF]' },
                  { label: 'Requests/Min', value: '10K+', percent: 90, color: 'from-[#0066FF]' },
                  { label: 'Fraud Latency', value: '<50ms', percent: 85, color: 'from-[#0066FF]' },
                  { label: 'Aiera × Anthropic', value: 'LIVE', percent: 100, color: 'from-[#00FF00]', isBadge: true }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-[#7BA4C7] font-medium">{metric.label}</span>
                      {metric.isBadge ? (
                        <span className={`text-sm font-bold text-[#00FF00] ${metric.isBadge ? 'pulse-blink' : ''}`}>
                          {metric.value}
                        </span>
                      ) : (
                        <span className="text-sm font-bold text-[#0066FF]">{metric.value}</span>
                      )}
                    </div>
                    <div className="h-1.5 bg-[#020764] rounded-full overflow-hidden shadow-[inset_0_0_8px_rgba(0,102,255,0.2)]">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${metric.color} to-transparent shadow-[0_0_8px_${metric.color === 'from-[#00FF00]' ? 'rgba(0,255,0,0.6)' : 'rgba(0,102,255,0.6)'}]`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.percent}%` }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 1.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Badge */}
              <div className="border border-[#FFD700] rounded-full px-4 py-2 text-center">
                <p className="text-xs font-semibold text-[#FFD700]">🏆 Official Anthropic Partner</p>
              </div>
            </motion.div>
          )}

          {/* CARD 2: Brand Identity Card */}
          {currentSlide === 2 && (
            <motion.div
              key="card-2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              exitTransition={exitTransition}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.05),#030812)] px-10 py-10 flex flex-col items-center justify-center gap-6 border-2 border-[#0066FF] shadow-[inset_0_0_32px_rgba(0,102,255,0.08),0_0_24px_rgba(0,102,255,0.3)]"
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0066FF] flex-shrink-0 flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-white">G</span>
              </motion.div>

              {/* Name */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black text-white tracking-[6px] font-poppins"
              >
                GUNASHREE RAJAKUMAR
              </motion.h3>

              {/* Divider Line with glow */}
              <motion.div
                className="h-px w-24 bg-gradient-to-r from-transparent via-[#0066FF] to-transparent shadow-[0_0_8px_rgba(0,102,255,0.8)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Titles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-1"
              >
                <p className="text-sm text-[#0066FF] font-semibold">Senior Software Engineer</p>
                <p className="text-xs text-[#7BA4C7]">Applied AI Systems Engineer</p>
              </motion.div>

              {/* Company Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 flex-wrap justify-center"
              >
                {['Aiera', 'Flipkart', 'Airtel', 'Ola', 'Avaamo'].map((company, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 border border-[#0066FF] text-[#0066FF] text-xs rounded-full font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {company}
                  </motion.span>
                ))}
              </motion.div>

              {/* Email */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                className="text-[11px] text-[#7BA4C7] font-mono pt-4 border-t border-[rgba(0,102,255,0.2)]"
              >
                rajakumar.g@northeastern.edu
              </motion.p>
            </motion.div>
          )}

          {/* CARD 3: Timeline Card */}
          {currentSlide === 3 && (
            <motion.div
              key="card-3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              exitTransition={exitTransition}
              className="absolute inset-0 bg-gradient-to-br from-[#030812] to-[#020764] px-8 py-8 flex flex-col gap-4 border border-[rgba(0,102,255,0.3)] shadow-[inset_0_0_32px_rgba(0,102,255,0.08)]"
            >
              {/* Title - reduced to 20px */}
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#0066FF] to-[#0066FF] bg-clip-text text-transparent tracking-widest">
                THE JOURNEY
              </h2>

              {/* Timeline items - compressed to fit all 6 */}
              <div className="space-y-3 flex flex-col">
                {[
                  { year: '2020', text: 'Avaamo · First AI role', isLast: false },
                  { year: '2021', text: 'Ola · Scale across 250+ cities', isLast: false },
                  { year: '2022', text: 'Airtel · Sub-50ms fraud detection', isLast: false },
                  { year: '2023', text: 'Flipkart · 110+ orders/sec peak', isLast: false },
                  { year: '2024', text: 'Northeastern · MS Computer Science', isLast: false },
                  { year: '2025', text: 'Aiera × Anthropic · Official Integration', isLast: true }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex gap-2.5 items-start p-1.5 rounded-lg transition-colors ${
                      item.isLast ? 'bg-[rgba(255,215,0,0.08)]' : ''
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center mt-0.5 flex-shrink-0">
                      {item.isLast ? (
                        <motion.span 
                          className="text-lg gold-glow"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ⭐
                        </motion.span>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
                      )}
                      {i < 5 && <div className="w-0.5 h-4 bg-gradient-to-b from-[#0066FF] to-[#0066FF] mt-0.5" />}
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                      <span className={`text-sm font-bold block ${item.isLast ? 'text-[#FFD700] gold-glow' : 'text-[#0066FF]'}`}>
                        {item.year}
                      </span>
                      <p className={`text-xs leading-snug ${item.isLast ? 'text-[#FFD700] font-semibold' : 'text-[#7BA4C7]'}`}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Bigger and More Visible */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all ${
              currentSlide === i
                ? 'w-8 h-3 bg-gradient-to-r from-[#0066FF] to-[#0066FF] shadow-lg shadow-[#0066FF]/50'
                : 'w-3 h-3 bg-[#020764] hover:bg-[#0066FF]/50'
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 text-xs font-mono text-[#7BA4C7]">
        {String(currentSlide + 1).padStart(2, '0')} / 04
      </div>
    </div>
  )
}
