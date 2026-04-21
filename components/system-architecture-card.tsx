'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const DATA_PIPELINE_NODES = [
  { id: 0, icon: '📊', label: 'Data', color: 'from-primary', value: '45K+ Events' },
  { id: 1, icon: '🔍', label: 'RAG', color: 'from-primary', value: 'BM25 + Vector' },
  { id: 2, icon: '🧠', label: 'LLM', color: 'from-accent', value: 'Claude 3' },
  { id: 3, icon: '⚡', label: 'Output', color: 'from-green-500', value: '<50ms' },
]

const INFRASTRUCTURE_NODES = [
  { id: 0, label: 'AWS EKS' },
  { id: 1, label: 'Redis Cache' },
  { id: 2, label: 'OpenSearch' },
  { id: 3, label: 'Prometheus' },
]

export function SystemArchitectureCard() {
  const [activePipeline, setActivePipeline] = useState(0)
  const [activeInfra, setActiveInfra] = useState(0)

  // Cycle through pipeline nodes every 800ms
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePipeline(prev => (prev + 1) % DATA_PIPELINE_NODES.length)
    }, 800)
    return () => clearInterval(timer)
  }, [])

  // Cycle through infrastructure nodes with 400ms offset
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInfra(prev => (prev + 1) % INFRASTRUCTURE_NODES.length)
    }, 800)
    const delay = setTimeout(() => timer, 400)
    return () => {
      clearTimeout(delay)
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="w-full h-full bg-[#0D1117] rounded-2xl border border-border p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-white">
          <span className="mr-2">⚡</span>System Architecture
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Production</span>
        </div>
      </div>

      {/* Data Pipeline Row */}
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          {DATA_PIPELINE_NODES.map((node, idx) => (
            <div key={node.id} className="flex items-center gap-3 flex-1">
              {/* Node */}
              <motion.div
                animate={{
                  boxShadow: activePipeline === idx 
                    ? '0 0 20px rgba(0, 194, 255, 0.6)' 
                    : '0 0 0px rgba(0, 194, 255, 0)',
                }}
                className={`flex-1 p-3 rounded-lg border-2 text-center min-w-0 ${
                  activePipeline === idx
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-transparent'
                } transition-all duration-300`}
              >
                <div className="text-lg">{node.icon}</div>
                <div className="text-xs font-bold text-white mt-1">{node.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{node.value}</div>
              </motion.div>

              {/* Arrow with flowing dots */}
              {idx < DATA_PIPELINE_NODES.length - 1 && (
                <div className="w-8 h-6 flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 relative overflow-hidden rounded">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 w-1 h-full bg-primary rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Infrastructure Row */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
          {INFRASTRUCTURE_NODES.map((node, idx) => (
            <div key={node.id} className="flex items-center gap-3 flex-1">
              {/* Node */}
              <motion.div
                animate={{
                  boxShadow: activeInfra === idx 
                    ? '0 0 20px rgba(123, 97, 255, 0.6)' 
                    : '0 0 0px rgba(123, 97, 255, 0)',
                }}
                className={`flex-1 p-3 rounded-lg border-2 text-center min-w-0 ${
                  activeInfra === idx
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-transparent'
                } transition-all duration-300`}
              >
                <div className="text-xs font-bold text-white">{node.label}</div>
              </motion.div>

              {/* Arrow */}
              {idx < INFRASTRUCTURE_NODES.length - 1 && (
                <div className="w-8 h-6 flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-accent/50 to-accent/20 relative overflow-hidden rounded">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 w-1 h-full bg-accent rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Badge */}
      <div className="mt-6 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 text-center">
        <p className="text-xs font-semibold text-white">
          🏆 Aiera × Anthropic — Official Integration
        </p>
      </div>
    </div>
  )
}
