"use client"

import { motion } from "framer-motion"
import { Puzzle, Link2, Rocket, Target } from "lucide-react"

const timeline = [
  {
    period: "2024 – Present",
    title: "MS Information Systems",
    organization: "Northeastern University, Boston",
    description: "Focusing on Applied AI, Machine Learning Systems, and Data Engineering."
  },
  {
    period: "2023 – 2024",
    title: "AI Systems Developer",
    organization: "Projects & Freelance",
    description: "Built production AI systems including RAG pipelines, semantic search, and LLM applications."
  },
  {
    period: "2019 – 2023",
    title: "B.E. Computer Science",
    organization: "Anna University, India",
    description: "Strong foundation in algorithms, data structures, and software engineering principles."
  }
]

const specializations = [
  {
    icon: Puzzle,
    title: "End-to-End AI System Design",
    description: "From requirements to deployment, building complete AI solutions."
  },
  {
    icon: Link2,
    title: "LLM + Semantic Search Integration",
    description: "Combining language models with vector databases for intelligent retrieval."
  },
  {
    icon: Rocket,
    title: "Production-Focused Engineering",
    description: "Building scalable, reliable systems that perform in real-world conditions."
  },
  {
    icon: Target,
    title: "Product-Oriented AI Development",
    description: "Aligning AI capabilities with user needs and business outcomes."
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            My <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Timeline */}
          <div className="relative">
            {/* Gradient vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 gradient-bg rounded-full" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full gradient-bg" />
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <span className="text-sm text-primary font-medium">{item.period}</span>
                    <h3 className="text-lg font-bold text-foreground mt-1 font-[family-name:var(--font-poppins)]">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.organization}</p>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Specializations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <spec.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  {spec.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
