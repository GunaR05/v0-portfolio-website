'use client'

import { useState, useEffect } from 'react'
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
  const [metricCounts, setMetricCounts] = useState({ users: 0, requests: 0, latency: 50, projects: 0 })

  const slides: Slide[] = ['positioning', 'metrics', 'brand', 'timeline']
  const slideIndex = slides.indexOf(currentSlide)

  // Auto-advance carousel
  useEffect(() => {
    if (!autoPlay) return
    const timer = setTimeout(() => {
      const nextIndex = (slideIndex + 1) % slides.length
      setCurrentSlide(slides[nextIndex])
    }, 4000)
    return () => clearTimeout(timer)
  }, [autoPlay, slideIndex, slides])

  // Typewriter effect for quote
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
    
    const animateMetrics = () => {
      let users = 0, requests = 0, latency = 50, projects = 0
      const interval = setInterval(() => {
        if (users < 100) users += Math.ceil(100 / 20)
        if (requests < 10000) requests += Math.ceil(10000 / 20)
        if (latency > 0) latency -= 2.5
        if (projects < 6) projects += 1
        
        setMetricCounts({
          users: Math.min(users, 100),
          requests: Math.min(requests, 10000),
          latency: Math.max(latency, 0),
          projects: Math.min(projects, 6)
        })
        
        if (users >= 100 && requests >= 10000 && latency <= 0 && projects >= 6) {
          clearInterval(interval)
        }
      }, 80)
      
      return () => clearInterval(interval)
    }
    
    return animateMetrics()
  }, [currentSlide])

  const timelineItems: TimelineItem[] = [
    { year: 2020, company: 'Avaamo', description: 'First AI role', isLast: false },
    { year: 2021, company: 'Ola', description: 'Scale across 250+ cities', isLast: false },
    { year: 2022, company: 'Airtel', description: 'Sub-50ms fraud detection', isLast: false },
    { year: 2023, company: 'Flipkart', description: '110+ orders/sec', isLast: false },
    { year: 2024, company: 'Northeastern', description: 'MS CS', isLast: false },
    { year: 2025, company: 'Aiera × Anthropic', description: 'Integration 🏆', isLast: true }
  ]

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        {currentSlide === 'positioning' && (
          <motion.div
            key="positioning"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#112236] border border-[#00C2FF]/50 rounded-2xl p-8 flex flex-col justify-center items-start gap-6 shadow-2xl"
            style={{
              boxShadow: '0 0 20px rgba(0, 194, 255, 0.2)'
            }}
          >
            {/* Gradient quote mark */}
            <div className="text-6xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent quote-glow">
              "
            </div>
            {/* Typewriter text */}
            <div className="space-y-4">
              <p className="text-2xl font-bold text-white font-poppins leading-tight h-16 overflow-hidden">
                {typewriterText}
                {typewriterText !== "I turn AI demos into production systems that scale." && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold">Gunashree Rajakumar</p>
                <p>Senior Software Engineer & Applied AI Systems Engineer</p>
              </div>
            </div>
          </motion.div>
        )}

        {currentSlide === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#112236] border border-[#00C2FF]/50 rounded-2xl p-8 flex flex-col justify-center gap-8 shadow-2xl"
            style={{
              boxShadow: '0 0 20px rgba(0, 194, 255, 0.2)'
            }}
          >
            <h3 className="text-xl font-bold text-[#00C2FF] tracking-wider">IMPACT AT SCALE</h3>
            
            {/* Metrics */}
            <div className="space-y-6">
              {[
                { label: 'Users Served', value: metricCounts.users, suffix: 'M+', percentage: 95 },
                { label: 'Requests/Min', value: metricCounts.requests, suffix: '+', percentage: 90 },
                { label: 'Latency', value: metricCounts.latency.toFixed(1), suffix: 'ms', percentage: 85 },
                { label: 'AI Projects', value: metricCounts.projects, suffix: '', percentage: 75 }
              ].map((metric, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-semibold text-white">{metric.label}</span>
                    <span className="text-lg font-bold text-[#00C2FF]">
                      {metric.value}
                      {metric.suffix}
                    </span>
                  </div>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.percentage}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div className="flex justify-center pt-4">
              <span className="text-xs font-semibold text-[#00C2FF] bg-[#00C2FF]/10 px-3 py-1 rounded-full">
                🤝 Aiera × Anthropic Official
              </span>
            </div>
          </motion.div>
        )}

        {currentSlide === 'brand' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#112236] border-2 border-transparent rounded-2xl p-8 flex flex-col items-center justify-center gap-4 shadow-2xl border-rotate"
            style={{
              background: 'linear-gradient(#112236, #112236) padding-box, linear-gradient(90deg, #00C2FF, #7B61FF, #00C2FF) border-box'
            }}
          >
            {/* Gradient G logo */}
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#7B61FF] flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">G</span>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold text-white font-poppins text-center tracking-wide">
              GUNASHREE RAJAKUMAR
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] my-3" />

            {/* Title */}
            <p className="text-sm font-semibold text-[#00C2FF] text-center">
              Senior Software Engineer
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Applied AI Systems Engineer
            </p>

            {/* Company pills */}
            <div className="flex flex-wrap gap-2 justify-center pt-4 text-xs text-muted-foreground">
              {['Aiera', 'Flipkart', 'Airtel', 'Ola'].map((company, idx) => (
                <span key={idx}>
                  {company}
                  {idx < 3 && <span className="ml-2">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {currentSlide === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#112236] border border-[#00C2FF]/50 rounded-2xl p-8 flex flex-col justify-center gap-6 shadow-2xl overflow-y-auto max-h-full"
            style={{
              boxShadow: '0 0 20px rgba(0, 194, 255, 0.2)'
            }}
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] bg-clip-text text-transparent">
              THE JOURNEY
            </h3>

            <div className="space-y-3">
              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`flex items-start gap-3 text-sm ${item.isLast ? 'timeline-glow' : ''}`}
                >
                  <span className={`font-bold min-w-fit ${item.isLast ? 'text-yellow-400' : 'text-[#00C2FF]'}`}>
                    {item.year}
                  </span>
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-white">{item.company}</span>
                    {' → '}
                    {item.description}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((slide, idx) => (
          <motion.button
            key={slide}
            onClick={() => {
              setCurrentSlide(slide)
              setAutoPlay(false)
            }}
            className={`rounded-full transition-all ${
              currentSlide === slide
                ? 'bg-gradient-to-r from-[#00C2FF] to-[#7B61FF] w-2.5 h-2.5'
                : 'bg-muted-foreground w-1.5 h-1.5 hover:bg-muted-foreground/70'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  )
}
