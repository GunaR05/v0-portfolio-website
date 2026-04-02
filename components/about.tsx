"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Brain, Building2, Users } from "lucide-react"
import Image from "next/image"

const valueCards = [
  {
    icon: Zap,
    title: "Applied Impact",
    description: "Building AI that solves real problems and delivers measurable value."
  },
  {
    icon: Brain,
    title: "Technical Depth",
    description: "Deep understanding of ML systems from theory to production."
  },
  {
    icon: Building2,
    title: "Reliability First",
    description: "Engineering robust systems that scale and perform consistently."
  },
  {
    icon: Users,
    title: "Clear Communication",
    description: "Translating complex AI concepts for diverse stakeholders."
  }
]

const skills = [
  { name: "LLM Systems & RAG Pipelines", percentage: 95 },
  { name: "Distributed Systems & Backend", percentage: 92 },
  { name: "React / TypeScript / Frontend", percentage: 88 },
  { name: "ML Platform & Feature Engineering", percentage: 90 },
  { name: "Cloud Infrastructure AWS/Azure/GCP", percentage: 85 },
  { name: "Observability & MLOps", percentage: 87 },
]

const techStack = [
  "Python", "LangChain", "OpenAI", "Anthropic Claude", "React", "TypeScript", 
  "Redux", "FastAPI", "Kafka", "Kubernetes", "Docker", "AWS EKS", 
  "Redis", "Spark", "PostgreSQL", "OpenSearch", "Prometheus", "Grafana", 
  "OpenTelemetry", "MCP Servers", "FAISS", "Spring Boot"
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 md:py-32 relative bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Photo and Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative w-[200px] h-[200px] rounded-full p-[3px] bg-gradient-to-br from-[#00C2FF] to-[#7B61FF]">
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <Image
                  src="/profile.jpg"
                  alt="Gunashree Rajakumar"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Section tag and heading */}
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
              Bridging AI Research &<br />
              <span className="gradient-text">Production Systems</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left content */}
          <div className="space-y-8">
            {/* About paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Senior Software Engineer and MS CS student at Northeastern University with 5+ years 
                of experience designing and shipping production-grade ML infrastructure, LLM-powered 
                agentic systems, and high-performance distributed backends across Aiera, Flipkart, 
                Airtel, and Ola.
              </p>
              <p>
                I specialize in the full AI/ML stack — from RAG pipelines and LLM inference to 
                real-time feature serving, distributed systems, and full-stack React/TypeScript 
                applications. My work serves institutional investors on Wall Street, hundreds of 
                millions of e-commerce users, and millions of daily riders.
              </p>
              <p>
                Currently pursuing MS Computer Science at Northeastern University, Boston, focusing on applied AI systems and intelligent infrastructure design.
              </p>
            </motion.div>

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-4">
              {valueCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                >
                  <card.icon className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right content - Skills */}
          <div ref={ref} className="space-y-8">
            {/* Skill bars */}
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm font-semibold text-primary">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-bg rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
