"use client"

import { useEffect, useState } from "react"

// Seeded PRNG — same result on server and client
function seeded(n: number) {
  const x = Math.sin(n + 1) * 10000
  return x - Math.floor(x)
}

// Build 52 × 7 grid (col = week, row = day Mon–Sun)
function buildGrid(): number[][] {
  const grid: number[][] = []
  for (let col = 0; col < 52; col++) {
    const week: number[] = []
    for (let row = 0; row < 7; row++) {
      const r = seeded(col * 7 + row)
      const isWeekend = row === 5 || row === 6
      // Last 8 weeks → mostly bright
      const isRecent = col >= 44
      let level = 0
      if (isRecent) {
        if (r > 0.15) level = r > 0.7 ? 4 : r > 0.45 ? 3 : 2
      } else if (isWeekend) {
        if (r > 0.6) level = r > 0.85 ? 2 : 1
      } else {
        if (r > 0.3) level = r > 0.88 ? 4 : r > 0.7 ? 3 : r > 0.52 ? 2 : 1
      }
      week.push(level)
    }
    grid.push(week)
  }
  return grid
}

const COLORS = ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"]
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const DAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" }

const GRID = buildGrid()

export function GitHubGraph() {
  // revealed[col] = true once that column is shown
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(52).fill(false))

  useEffect(() => {
    // Reveal one column every ~38ms → full grid in ~2s
    let col = 0
    const tick = () => {
      if (col >= 52) return
      const c = col
      setRevealed(prev => {
        const next = [...prev]
        next[c] = true
        return next
      })
      col++
      setTimeout(tick, 38)
    }
    setTimeout(tick, 200)
  }, [])

  // Month label positioning: one label per ~4.33 cols
  const monthPositions = MONTHS.map((m, i) => ({
    label: m,
    col: Math.round((i / 12) * 52),
  }))

  return (
    <div
      className="rounded-xl overflow-hidden border border-[#30363D] w-full"
      style={{ background: "#0D1117", fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262D]">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #00C2FF, #6633FF)", color: "#fff" }}
          >
            G
          </div>
          <span className="text-sm font-semibold" style={{ color: "#E6EDF3" }}>
            GunaR05 <span style={{ color: "#8B949E" }}>/</span> contributions
          </span>
        </div>
        {/* Active badge */}
        <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#3FB950" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#3FB950" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#3FB950" }} />
          </span>
          Active
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-xs font-semibold" style={{ color: "#E6EDF3" }}>
          6,658 contributions in the last year
        </span>
        <div className="flex items-center gap-3 text-xs" style={{ color: "#8B949E" }}>
          <span><span style={{ color: "#58A6FF" }}>24</span> Repos</span>
          <span>·</span>
          <span><span style={{ color: "#58A6FF" }}>187</span> PRs</span>
          <span>·</span>
          <span><span style={{ color: "#58A6FF" }}>312</span> Stars</span>
        </div>
      </div>

      {/* Graph area */}
      <div className="px-4 pb-3 pt-1 overflow-x-auto">
        <div style={{ minWidth: 640 }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: 28 }}>
            {monthPositions.map(({ label, col }) => (
              <div
                key={label}
                className="absolute text-xs"
                style={{
                  color: "#8B949E",
                  fontSize: 10,
                  position: "relative",
                  left: `${(col / 52) * 100}%`,
                  width: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Day labels + grid */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 pt-0" style={{ width: 26 }}>
              {Array.from({ length: 7 }).map((_, row) => (
                <div
                  key={row}
                  className="text-right"
                  style={{
                    fontSize: 9,
                    color: "#8B949E",
                    height: 11,
                    lineHeight: "11px",
                  }}
                >
                  {DAY_LABELS[row] ?? ""}
                </div>
              ))}
            </div>

            {/* Heatmap columns */}
            <div className="flex gap-[3px] flex-1">
              {GRID.map((week, col) => (
                <div key={col} className="flex flex-col gap-[3px]">
                  {week.map((level, row) => (
                    <div
                      key={row}
                      title={`Level ${level}`}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: 2,
                        background: revealed[col] ? COLORS[level] : COLORS[0],
                        transition: revealed[col] ? "background 0.3s ease" : "none",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-2">
            <span style={{ color: "#8B949E", fontSize: 10 }}>Less</span>
            {COLORS.map((c, i) => (
              <div
                key={i}
                style={{ width: 11, height: 11, borderRadius: 2, background: c, border: "1px solid rgba(255,255,255,0.06)" }}
              />
            ))}
            <span style={{ color: "#8B949E", fontSize: 10 }}>More</span>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-t border-[#21262D] text-xs"
        style={{ color: "#8B949E", background: "#0D1117" }}
      >
        <span style={{ color: "#58A6FF" }}>ML / LLM / RAG</span>
        <span>·</span>
        <span style={{ color: "#6633FF" }}>&#x1F537; Aiera × Anthropic</span>
        <span>·</span>
        <span style={{ color: "#3FB950", fontFamily: "monospace" }}>open_to_work</span>
      </div>
    </div>
  )
}
