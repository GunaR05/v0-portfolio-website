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
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[rgba(0,194,255,0.3)]">
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
              className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] to-[#1A3C5E] p-8 flex flex-col justify-between border border-[rgba(0,194,255,0.3)]"
            >
              {/* Quote Mark */}
              <div className="text-8xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent leading-none">
                "
              </div>

              {/* Main Quote Text - staggered word reveal */}
              <div className="flex flex-col gap-4">
                <div className="text-4xl font-bold text-white leading-tight max-w-md">
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
                  className="h-1.5 rounded-full bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]"
                  initial={{ width: 0 }}
                  animate={{ width: 280 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />
              </div>

              {/* Bottom Row - Profile */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">Gunashree Rajakumar</p>
                  <p className="text-xs text-[#8BA3BC]">Senior Software Engineer</p>
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
              className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] to-[#1A2A3A] p-8 flex flex-col justify-between border border-[rgba(0,194,255,0.3)]"
            >
              {/* Title */}
              <div>
                <h2 className="text-lg font-bold tracking-widest bg-gradient-to-r from-[#00C2FF] to-[#00E5C3] bg-clip-text text-transparent">
                  IMPACT AT SCALE
                </h2>
              </div>

              {/* Metrics */}
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {[
                  { label: 'Users Served', value: '100M+', percent: 95, color: 'from-[#00C2FF]' },
                  { label: 'Requests/Min', value: '10K+', percent: 90, color: 'from-[#7B61FF]' },
                  { label: 'Fraud Latency', value: '<50ms', percent: 85, color: 'from-[#00E5C3]' },
                  { label: 'Aiera × Anthropic', value: 'LIVE', percent: 100, color: 'from-[#FFD700]' }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-[#8BA3BC] font-medium">{metric.label}</span>
                      <span className="text-sm font-bold text-[#00C2FF]">{metric.value}</span>
                    </div>
                    <div className="h-1 bg-[#1E3A55] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${metric.color} to-transparent`}
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
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,#112236,#0D1B2A)] p-8 flex flex-col items-center justify-center gap-4 border-2 border-transparent"
              style={{
                backgroundImage: 'linear-gradient(#0D1B2A, #0D1B2A) padding-box, linear-gradient(135deg, #00C2FF, #7B61FF, #00C2FF) border-box',
              }}
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex-shrink-0"
              />

              {/* Name */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold text-white tracking-widest"
              >
                GUNASHREE RAJAKUMAR
              </motion.h3>

              {/* Divider Line with glow */}
              <motion.div
                className="h-px w-24 bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent"
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
                <p className="text-sm text-[#00C2FF] font-semibold">Senior Software Engineer</p>
                <p className="text-xs text-[#8BA3BC]">Applied AI Systems Engineer</p>
              </motion.div>

              {/* Company Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-2 flex-wrap justify-center"
              >
                {['Aiera', 'Flipkart', 'Airtel', 'Ola'].map((company, i) => (
                  <motion.span
                    key={i}
                    className="px-2 py-1 border border-[#00C2FF] text-[#00C2FF] text-xs rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    {company}
                  </motion.span>
                ))}
              </motion.div>

              {/* Email */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[10px] text-[#8BA3BC] font-mono"
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
              className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A] to-[#1A1A3E] p-8 flex flex-col justify-between border border-[rgba(0,194,255,0.3)]"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent tracking-widest">
                THE JOURNEY
              </h2>

              {/* Timeline items */}
              <div className="space-y-2.5 flex-1 flex flex-col justify-center">
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
                    className="flex gap-3 items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center mt-0.5">
                      {item.isLast ? (
                        <span className="text-xl">⭐</span>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#00C2FF]" />
                      )}
                      {i < 5 && <div className="w-0.5 h-5 bg-gradient-to-b from-[#00C2FF] to-[#7B61FF] mt-1" />}
                    </div>

                    {/* Content */}
                    <div>
                      <span className={`text-xs font-bold ${item.isLast ? 'text-[#FFD700]' : 'text-[#00C2FF]'}`}>
                        {item.year}
                      </span>
                      <p className={`text-xs ${item.isLast ? 'text-[#FFD700] font-semibold' : 'text-[#8BA3BC]'}`}>
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

      {/* Navigation Dots */}
      <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all ${
              currentSlide === i
                ? 'w-6 h-2 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]'
                : 'w-2 h-2 bg-[#1E3A55]'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 text-xs font-mono text-[#8BA3BC]">
        {String(currentSlide + 1).padStart(2, '0')} / 04
      </div>
    </div>
  )
}
