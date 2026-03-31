"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Brain, Building2, Users } from "lucide-react"

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
  { name: "LLM Integration & Prompt Engineering", percentage: 92 },
  { name: "Semantic Search & RAG Pipelines", percentage: 88 },
  { name: "Python / FastAPI / Backend Systems", percentage: 90 },
  { name: "Cloud Deployment AWS/GCP", percentage: 80 },
  { name: "Vector Databases Pinecone/FAISS", percentage: 85 },
  { name: "System Design & Architecture", percentage: 83 },
]

const techStack = [
  "Python", "LangChain", "OpenAI API", "FastAPI", "Pinecone", "FAISS",
  "PostgreSQL", "Docker", "AWS", "GCP", "React", "Git"
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Bridging AI Research & <span className="gradient-text">Production Systems</span>
          </h2>
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
                As an Applied AI Systems Engineer pursuing my Master&apos;s at Northeastern University, 
                I specialize in bridging the gap between cutting-edge AI research and production-ready 
                systems. My work focuses on building intelligent applications that leverage large 
                language models, semantic search, and scalable backend architectures.
              </p>
              <p>
                I&apos;m passionate about transforming complex AI concepts into reliable, maintainable 
                software. Whether it&apos;s designing RAG pipelines that reduce hallucinations, optimizing 
                vector search for millisecond latencies, or architecting LLM-powered workflows, 
                I bring a systems-thinking approach to every challenge.
              </p>
              <p>
                My goal is to create AI solutions that don&apos;t just work in demos—they excel in 
                production environments where reliability, scalability, and user experience matter.
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
                    className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors"
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
