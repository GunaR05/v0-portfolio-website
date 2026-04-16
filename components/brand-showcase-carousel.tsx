'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Slide = 'positioning' | 'metrics' | 'brand' | 'timeline'

interface TimelineItem {
  year: number
  company: string
  description: string
  isLast: boolean
}

export function BrandShowcaseCarousel() {
  const [currentSlide, setCurrentSlide] = useState<Slide>('positioning')
  const [autoPlay, setAutoPlay] = useState(true)
  const [typewriterText, setTypewriterText] = useState('')
  const [metricCounts, setMetricCounts] = useState({ users: 0, requests: 0, latency: 50, projects: 100 })
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const slides: Slide[] = ['positioning', 'metrics', 'brand', 'timeline']
  const slideIndex = slides.indexOf(currentSlide)

  // Auto-advance carousel with setInterval - FIXED
  useEffect(() => {
    if (!autoPlay) return

    // Clear any existing interval
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current)
    }

    // Set new interval that advances slides every 4 seconds
    autoPlayIntervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const currentIdx = slides.indexOf(prevSlide)
        const nextIdx = (currentIdx + 1) % slides.length
        return slides[nextIdx]
      })
    }, 4000)

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [autoPlay, slides])

  // Typewriter effect for positioning quote
  useEffect(() => {
    if (currentSlide !== 'positioning') return

    const quote = "I turn AI demos into production systems that scale."
    let index = 0
    setTypewriterText('')

    const interval = setInterval(() => {
      if (index < quote.length) {
        setTypewriterText(quote.substring(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [currentSlide])

  // Count-up animation for metrics
  useEffect(() => {
    if (currentSlide !== 'metrics') return

    let users = 0,
      requests = 0,
      latency = 50,
      projects = 0
    const interval = setInterval(() => {
      if (users < 100) users += Math.ceil(100 / 20)
      if (requests < 10) requests += Math.ceil(10 / 20)
      if (latency > 50) latency -= 2.5
      if (projects < 100) projects += Math.ceil(100 / 20)

      setMetricCounts({
        users: Math.min(users, 100),
        requests: Math.min(requests, 10),
        latency: Math.max(latency, 50),
        projects: Math.min(projects, 100),
      })

      if (users >= 100 && requests >= 10 && latency <= 50 && projects >= 100) {
        clearInterval(interval)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [currentSlide])

  const timelineItems: TimelineItem[] = [
    { year: 2020, company: 'Avaamo', description: 'First AI role', isLast: false },
    { year: 2021, company: 'Ola', description: '250+ cities at scale', isLast: false },
    { year: 2022, company: 'Airtel', description: 'Sub-50ms fraud detection', isLast: false },
    { year: 2023, company: 'Flipkart', description: '110+ orders/sec', isLast: false },
    { year: 2024, company: 'Northeastern', description: 'MS Computer Science', isLast: false },
    {
      year: 2025,
      company: 'Aiera × Anthropic',
      description: 'OFFICIAL INTEGRATION 🏆',
      isLast: true,
    },
  ]

  const goToSlide = (slide: Slide) => {
    setCurrentSlide(slide)
    setAutoPlay(false)
    // Resume auto-play after 5 seconds
    setTimeout(() => setAutoPlay(true), 5000)
  }

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D1B2A]"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,194,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Card counter - top right */}
      <div className="absolute top-4 right-4 text-xs font-mono text-[#00C2FF]/60 z-20">
        {String(slideIndex + 1).padStart(2, '0')} / 04
      </div>

      <AnimatePresence mode="wait">
        {/* CARD 1: Brand Positioning */}
        {currentSlide === 'positioning' && (
          <motion.div
            key="positioning"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center items-start gap-8 border border-transparent overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,194,255,0.05) 0%, rgba(123,97,255,0.05) 100%), radial-gradient(ellipse at center, rgba(0,194,255,0.1) 0%, transparent 100%)',
              borderImageSource: 'linear-gradient(45deg, #00C2FF, #7B61FF, #00C2FF)',
              borderImageSlice: 1,
            }}
          >
            {/* Large gradient quote mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent"
            >
              "
            </motion.div>

            {/* Typewriter quote */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <p className="text-[28px] font-bold text-white font-poppins leading-tight min-h-[100px]">
                  {typewriterText}
                  {typewriterText !== 'I turn AI demos into production systems that scale.' && (
                    <span className="animate-pulse">_</span>
                  )}
                </p>
                {/* Gradient underline */}
                {typewriterText.length > 0 && (
                  <motion.div
                    className="h-1 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </div>
            </div>

            {/* Profile row */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#00C2FF]/20 w-full">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">G</span>
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Gunashree</p>
                <p className="text-[#00C2FF]">Applied AI Engineer</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CARD 2: Impact Metrics */}
        {currentSlide === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center gap-8 border border-[#00C2FF]/30 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,194,255,0.05) 0%, rgba(123,97,255,0.05) 100%), radial-gradient(ellipse at center, rgba(0,194,255,0.1) 0%, transparent 100%)',
            }}
          >
            {/* Header with icon */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent tracking-widest">
                IMPACT AT SCALE
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]" />
            </motion.div>

            {/* Metrics rows */}
            <div className="space-y-5">
              {[
                { icon: '🌍', label: 'Users Served', value: `${metricCounts.users}M+`, percentage: 95 },
                { icon: '⚡', label: 'Requests/Min', value: `${metricCounts.requests}K+`, percentage: 90 },
                { icon: '🎯', label: 'Latency', value: `${metricCounts.latency.toFixed(0)}ms`, percentage: 85 },
                { icon: '🤝', label: 'Aiera x Anthropic', value: 'Live', percentage: 100 },
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{metric.icon}</span>
                      <span className="text-sm font-semibold text-white">{metric.label}</span>
                      <span className="text-[#8BA3BC] text-xs">{'.' + '.'.repeat(20 - metric.label.length)}</span>
                    </div>
                    <span className="text-base font-bold text-[#00C2FF]">{metric.value}</span>
                  </div>
                  {/* Animated bar */}
                  <div className="h-2 bg-[#1E3A55] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00C2FF] to-[#7B61FF]"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.percentage}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center pt-2"
            >
              <span className="text-xs font-semibold text-[#00C2FF] bg-[#00C2FF]/15 px-4 py-2 rounded-full border border-[#00C2FF]/30">
                Official Anthropic Partner
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* CARD 3: Premium Brand Card */}
        {currentSlide === 'brand' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 border-2 border-transparent overflow-hidden"
            style={{
              background:
                'linear-gradient(#0D1B2A, #0D1B2A) padding-box, linear-gradient(90deg, #00C2FF, #7B61FF, #00C2FF) border-box',
              animation: 'border-rotate 8s linear infinite',
            }}
          >
            {/* Gradient G logo square */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex items-center justify-center shadow-lg"
            >
              <span className="text-5xl font-bold text-white">G</span>
            </motion.div>

            {/* Name with spaced letters */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl font-bold text-white text-center tracking-widest font-poppins"
            >
              GUNASHREE RAJAKUMAR
            </motion.h2>

            {/* Animated cyan divider */}
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Titles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center space-y-1"
            >
              <p className="text-sm font-bold text-[#00C2FF]">Senior Software Engineer</p>
              <p className="text-xs text-[#8BA3BC]">Applied AI Systems Engineer</p>
            </motion.div>

            {/* Company pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center pt-4"
            >
              {['Aiera', 'Flipkart', 'Airtel', 'Ola'].map((company, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, color: '#00C2FF' }}
                  className="px-3 py-1 text-xs font-semibold text-[#8BA3BC] border border-[#00C2FF]/30 rounded-full cursor-pointer transition-colors"
                >
                  {company}
                </motion.span>
              ))}
            </motion.div>

            {/* Email */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs font-mono text-[#00C2FF] pt-4 border-t border-[#00C2FF]/20 w-full text-center"
            >
              gunarajakumar.ai@gmail.com
            </motion.p>
          </motion.div>
        )}

        {/* CARD 4: Journey Timeline */}
        {currentSlide === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-center gap-6 border border-[#00C2FF]/30 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,194,255,0.05) 0%, rgba(123,97,255,0.05) 100%), radial-gradient(ellipse at center, rgba(0,194,255,0.1) 0%, transparent 100%)',
            }}
          >
            {/* Header */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent tracking-widest"
            >
              THE JOURNEY
            </motion.h2>

            {/* Timeline items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex items-start gap-4 text-sm p-3 rounded-lg transition-colors ${
                    item.isLast ? 'bg-[#7B61FF]/20 border border-yellow-400/30' : 'hover:bg-[#00C2FF]/10'
                  }`}
                >
                  {/* Dot and line */}
                  <div className="flex flex-col items-center mt-0.5">
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.isLast
                          ? 'w-3.5 h-3.5 bg-yellow-400 shadow-lg shadow-yellow-400/50'
                          : 'bg-[#00C2FF] shadow-md shadow-[#00C2FF]/50'
                      }`}
                      whileHover={item.isLast ? { scale: 1.3 } : { scale: 1.15 }}
                    />
                    {idx < timelineItems.length - 1 && (
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[#00C2FF] to-[#7B61FF] mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold text-sm ${item.isLast ? 'text-yellow-400' : 'text-[#00C2FF]'}`}>
                        {item.year}
                      </span>
                      <span className={`font-semibold ${item.isLast ? 'text-yellow-300' : 'text-white'}`}>
                        {item.company}
                      </span>
                    </div>
                    <p className="text-xs text-[#8BA3BC]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots - redesigned */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((slide, idx) => (
          <motion.button
            key={slide}
            onClick={() => goToSlide(slide)}
            className={`rounded-full transition-all ${
              currentSlide === slide
                ? 'bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] w-6 h-2'
                : 'bg-[#1E3A55] w-2 h-2 hover:bg-[#00C2FF]/50'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}
