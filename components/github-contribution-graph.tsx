"use client"

import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

// Simple seeded random for consistent SSR/client rendering
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate a realistic-looking contribution grid (52 weeks × 7 days)
function generateContributions(): number[][] {
  const weeks = 52
  const days = 7
  const grid: number[][] = []

  for (let w = 0; w < weeks; w++) {
    const week: number[] = []
    for (let d = 0; d < days; d++) {
      // Use seeded random for consistent SSR/client
      const seed = w * 7 + d + 12345
      const rand = seededRandom(seed)
      const isWeekend = d === 0 || d === 6
      let level = 0

      if (isWeekend) {
        if (rand > 0.65) level = rand > 0.85 ? 2 : 1
      } else {
        if (rand > 0.25) {
          if (rand > 0.90) level = 4
          else if (rand > 0.75) level = 3
          else if (rand > 0.55) level = 2
          else level = 1
        }
      }

      // Hot streaks — burst of high activity
      if (w >= 10 && w <= 14) level = Math.min(4, level + (rand > 0.3 ? 1 : 0))
      if (w >= 36 && w <= 44) level = Math.min(4, level + (rand > 0.2 ? 2 : 1))

      week.push(level)
    }
    grid.push(week)
  }

  return grid
}

const LEVEL_COLORS = [
  "#1a1f2e",   // 0 - empty
  "#0e4429",   // 1 - light green
  "#006d32",   // 2 - medium green
  "#26a641",   // 3 - bright green
  "#39d353",   // 4 - vivid green
]

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAY_LABELS   = ["", "Mon", "", "Wed", "", "Fri", ""]

// Pre-generate grid to avoid hydration mismatch
const STATIC_GRID = generateContributions()
const STATIC_TOTAL = STATIC_GRID.flat().reduce((sum, v) => sum + v, 0)

export function GitHubContributionGraph() {
  const grid = STATIC_GRID
  const [revealed, setRevealed] = useState<boolean[][]>([])
  const [hoveredCell, setHoveredCell] = useState<{ w: number; d: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize revealed state after mount to avoid hydration issues
  useEffect(() => {
    setRevealed(Array.from({ length: 52 }, () => Array(7).fill(false)))
    setMounted(true)
  }, [])

  // Reveal cells left-to-right with stagger after mount
  useEffect(() => {
    if (!mounted) return
    
    let col = 0
    let timerId: ReturnType<typeof setTimeout>
    
    const reveal = () => {
      if (col >= 52) return
      setRevealed(prev => {
        if (prev.length === 0) return prev
        const next = prev.map(r => [...r])
        if (next[col]) {
          for (let d = 0; d < 7; d++) next[col][d] = true
        }
        return next
      })
      col++
      timerId = setTimeout(reveal, 18)
    }
    
    timerId = setTimeout(reveal, 300)
    return () => clearTimeout(timerId)
  }, [mounted])

  const totalCommits = Math.floor(STATIC_TOTAL * 12.4)

  return (
    <div className="w-full rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl">

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
        <div className="flex items-center gap-2.5">
          {/* GitHub-style avatar placeholder */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
            G
          </div>
          <span className="text-[#e6edf3] text-sm font-semibold font-mono">GunaR05</span>
          <span className="text-[#8b949e] text-xs font-mono">/ contributions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
          <span className="text-[#3fb950] text-xs font-mono">Active</span>
        </div>
      </div>

      {/* Graph area */}
      <div className="px-4 pt-4 pb-2">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#8b949e] text-xs font-mono">
            <span className="text-[#e6edf3] font-semibold">{totalCommits.toLocaleString()}</span> contributions in the last year
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: "Repos", value: "24" },
              { label: "PRs", value: "187" },
              { label: "Stars", value: "312" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-[#e6edf3] text-xs font-bold font-mono">{stat.value}</div>
                <div className="text-[#8b949e] text-[10px] font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Month labels */}
        <div className="flex ml-8 mb-1">
          {MONTH_LABELS.map((month, i) => (
            <div
              key={month}
              className="text-[#8b949e] text-[10px] font-mono"
              style={{ width: `${(52 / 12) * 11}px`, minWidth: 0 }}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Grid + day labels */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-[3px] mr-1">
            {DAY_LABELS.map((label, i) => (
              <div key={i} className="text-[#8b949e] text-[10px] font-mono h-[11px] flex items-center justify-end w-6 pr-1">
                {label}
              </div>
            ))}
          </div>

          {/* Contribution cells */}
          <div className="flex gap-[3px] flex-1">
            {grid.map((week, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {week.map((level, d) => {
                  const isHovered = hoveredCell?.w === w && hoveredCell?.d === d
                  return (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={
                        revealed[w]?.[d]
                          ? { opacity: 1, scale: isHovered ? 1.4 : 1 }
                          : { opacity: 0, scale: 0.5 }
                      }
                      transition={{ duration: 0.15 }}
                      onMouseEnter={() => setHoveredCell({ w, d })}
                      onMouseLeave={() => setHoveredCell(null)}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 2,
                        backgroundColor: LEVEL_COLORS[level],
                        boxShadow: isHovered && level > 0
                          ? `0 0 6px ${LEVEL_COLORS[level]}`
                          : undefined,
                        cursor: "default",
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 mt-2 mb-1">
          <span className="text-[#8b949e] text-[10px] font-mono">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div
              key={i}
              style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }}
            />
          ))}
          <span className="text-[#8b949e] text-[10px] font-mono">More</span>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-[#30363d] bg-[#161b22]">
        <div className="flex items-center gap-4">
          {[
            { icon: "⬡", label: "ML / LLM / RAG", color: "#3fb950" },
            { icon: "◈", label: "Aiera × Anthropic", color: "#58a6ff" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span style={{ color: item.color }} className="text-xs">{item.icon}</span>
              <span className="text-[#8b949e] text-[10px] font-mono">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
          <span className="text-[#3fb950] text-[10px] font-mono font-semibold">open_to_work</span>
        </div>
      </div>

    </div>
  )
}
