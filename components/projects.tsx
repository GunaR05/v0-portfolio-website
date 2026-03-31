"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

const filters = ["All", "LLM", "Search", "MLOps"]

const projects = [
  {
    id: 1,
    title: "Intelligent Document Q&A System",
    description: "Production-grade RAG pipeline with semantic chunking, hybrid search, and GPT-4 integration for enterprise document intelligence.",
    tags: ["LLM", "RAG", "FastAPI"],
    category: "LLM",
    icon: "📄",
    gradient: "from-blue-900/50 to-blue-800/30"
  },
  {
    id: 2,
    title: "Semantic Search Pipeline",
    description: "High-performance vector search system with FAISS indexing, achieving sub-10ms query latency at million-document scale.",
    tags: ["Semantic Search", "FAISS", "Python"],
    category: "Search",
    icon: "🔍",
    gradient: "from-purple-900/50 to-purple-800/30"
  },
  {
    id: 3,
    title: "AI Customer Support Agent",
    description: "Multi-turn conversational AI with context persistence, sentiment analysis, and seamless human handoff capabilities.",
    tags: ["Chatbot", "LangChain", "Docker"],
    category: "LLM",
    icon: "🤖",
    gradient: "from-teal-900/50 to-teal-800/30"
  },
  {
    id: 4,
    title: "ML Model Monitoring System",
    description: "End-to-end MLOps platform with drift detection, automated retraining, and real-time performance dashboards.",
    tags: ["MLOps", "MLflow", "GCP"],
    category: "MLOps",
    icon: "📊",
    gradient: "from-violet-900/50 to-violet-800/30"
  },
  {
    id: 5,
    title: "AI Knowledge Graph Explorer",
    description: "Interactive knowledge graph built from unstructured text using NER and relation extraction with React visualization.",
    tags: ["NLP", "Knowledge Graph", "React"],
    category: "LLM",
    icon: "🧠",
    gradient: "from-emerald-900/50 to-emerald-800/30"
  },
  {
    id: 6,
    title: "LLM Evaluation Framework",
    description: "Comprehensive testing suite for LLM applications with automated benchmarking, bias detection, and quality metrics.",
    tags: ["LLMOps", "Evaluation", "API"],
    category: "MLOps",
    icon: "⚡",
    gradient: "from-orange-900/50 to-orange-800/30"
  }
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  )

  return (
    <section id="projects" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2 mb-12 flex-wrap"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 transition-all ${
                activeFilter === filter
                  ? "gradient-bg text-white border-0"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-gradient-to-br ${project.gradient} border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300`}
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{project.icon}</div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-background/50 text-muted-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-poppins)]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Case Study
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
