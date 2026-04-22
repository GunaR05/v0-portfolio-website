"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Simplified world continent SVG paths scaled to a 500x280 viewBox
const CONTINENTS = [
  // North America
  { id: "na", d: "M55,40 L95,38 L115,50 L120,70 L110,90 L105,110 L90,125 L75,130 L65,120 L55,100 L45,80 L40,60 Z" },
  // Greenland
  { id: "gl", d: "M120,20 L140,18 L148,28 L140,38 L122,36 Z" },
  // Central America
  { id: "ca", d: "M90,125 L105,110 L108,130 L100,145 L88,140 Z" },
  // South America
  { id: "sa", d: "M95,148 L120,142 L135,155 L140,180 L135,210 L120,230 L105,235 L90,220 L82,200 L80,175 L85,158 Z" },
  // Europe
  { id: "eu", d: "M215,35 L245,30 L258,40 L262,55 L250,65 L235,68 L220,62 L210,50 Z" },
  // UK/Ireland
  { id: "uk", d: "M205,38 L212,34 L214,44 L207,46 Z" },
  // Africa
  { id: "af", d: "M218,72 L250,68 L268,80 L272,110 L265,145 L248,165 L230,168 L215,155 L208,130 L210,100 L214,80 Z" },
  // Russia / North Asia
  { id: "ru", d: "M258,22 L340,18 L370,28 L375,45 L340,52 L300,55 L265,50 L252,38 Z" },
  // Middle East
  { id: "me", d: "M262,68 L285,65 L295,75 L290,92 L270,95 L258,82 Z" },
  // South Asia (India)
  { id: "in", d: "M295,72 L318,70 L325,85 L322,105 L310,118 L298,108 L290,95 L290,78 Z" },
  // Southeast Asia
  { id: "sea", d: "M330,80 L355,75 L368,88 L362,105 L345,108 L328,98 Z" },
  // East Asia
  { id: "ea", d: "M335,50 L375,45 L390,60 L385,78 L360,82 L335,75 Z" },
  // Japan
  { id: "jp", d: "M385,55 L395,52 L398,62 L390,66 L383,62 Z" },
  // Australia
  { id: "au", d: "M345,175 L380,170 L395,182 L398,205 L385,218 L360,220 L342,210 L338,192 Z" },
  // New Zealand
  { id: "nz", d: "M402,210 L410,205 L412,218 L405,224 Z" },
]

// City coordinates in the 500x280 viewBox
// Boston: roughly 30% from left, 28% from top
// Bengaluru: roughly 62% from left, 52% from top
const BOSTON = { x: 102, y: 78, label: "Boston, MA", sublabel: "Aiera × Anthropic", color: "#0066FF" }
const BENGALURU = { x: 308, y: 100, label: "Bengaluru", sublabel: "Flipkart · Airtel · Ola", color: "#6633FF" }

function PulsingDot({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g>
      {/* Outer ripple 1 */}
      <circle cx={cx} cy={cy} r={10} fill="none" stroke={color} strokeWidth={1} opacity={0.6}>
        <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Outer ripple 2 - offset */}
      <circle cx={cx} cy={cy} r={10} fill="none" stroke={color} strokeWidth={1} opacity={0.4}>
        <animate attributeName="r" values="6;18;6" dur="2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" begin="0.7s" repeatCount="indefinite" />
      </circle>
      {/* Core dot */}
      <circle cx={cx} cy={cy} r={4} fill={color} />
      {/* Inner glow */}
      <circle cx={cx} cy={cy} r={6} fill={color} opacity={0.25} />
    </g>
  )
}

export function WorldMapCard() {
  const [dashOffset, setDashOffset] = useState(200)

  useEffect(() => {
    let frame: number
    let offset = 200
    const animate = () => {
      offset = offset <= 0 ? 200 : offset - 0.8
      setDashOffset(offset)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl overflow-hidden border border-[#1a2332]"
      style={{ background: "#0D1117" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a2332]">
        <div className="flex items-center gap-2">
          <span className="text-base">🌍</span>
          <span className="text-sm font-semibold text-white font-mono tracking-wide">Global Impact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs text-green-400 font-mono">Live Systems</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative px-2 pt-2 pb-1">
        <svg
          viewBox="0 0 500 280"
          className="w-full"
          style={{ background: "#0a0f1a", borderRadius: "8px" }}
          aria-label="World map showing Boston and Bengaluru"
        >
          {/* Continents */}
          {CONTINENTS.map((c) => (
            <path key={c.id} d={c.d} fill="#1a2332" stroke="#243048" strokeWidth={0.8} />
          ))}

          {/* Animated dotted connecting line */}
          <line
            x1={BOSTON.x}
            y1={BOSTON.y}
            x2={BENGALURU.x}
            y2={BENGALURU.y}
            stroke="#0066FF"
            strokeWidth={1.2}
            strokeDasharray="6 4"
            strokeDashoffset={dashOffset}
            opacity={0.5}
          />

          {/* City dots */}
          <PulsingDot cx={BOSTON.x} cy={BOSTON.y} color={BOSTON.color} />
          <PulsingDot cx={BENGALURU.x} cy={BENGALURU.y} color={BENGALURU.color} />

          {/* Boston label */}
          <g>
            <text x={BOSTON.x + 8} y={BOSTON.y - 6} fill={BOSTON.color} fontSize="7" fontFamily="monospace" fontWeight="bold">{BOSTON.label}</text>
            <text x={BOSTON.x + 8} y={BOSTON.y + 4} fill="#8BA3BC" fontSize="5.5" fontFamily="monospace">{BOSTON.sublabel}</text>
          </g>

          {/* Bengaluru label — flip left since it's right of center */}
          <g>
            <text x={BENGALURU.x - 82} y={BENGALURU.y - 6} fill={BENGALURU.color} fontSize="7" fontFamily="monospace" fontWeight="bold">{BENGALURU.label}</text>
            <text x={BENGALURU.x - 82} y={BENGALURU.y + 4} fill="#8BA3BC" fontSize="5.5" fontFamily="monospace">{BENGALURU.sublabel}</text>
          </g>
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-0 border-t border-[#1a2332]">
        {[
          { value: "2 Countries", label: "Active" },
          { value: "100M+", label: "Users Served" },
          { value: "5+ Years", label: "Experience" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-3 border-r border-[#1a2332] last:border-r-0">
            <span className="text-sm font-bold text-white font-mono">{stat.value}</span>
            <span className="text-[10px] text-[#4A6580] font-mono mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Footer label */}
      <div className="px-5 py-2.5 text-center border-t border-[#1a2332]">
        <span className="text-[11px] text-[#4A6580] font-mono">Systems running across 2 continents</span>
      </div>
    </motion.div>
  )
}
