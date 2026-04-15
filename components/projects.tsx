"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Building2, Shield, ShoppingCart, Car, BarChart3, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const filters = ["All", "LLM", "MLOps", "Distributed"]

const projects = [
  {
    id: 1,
    title: "RAG Financial Research Platform",
    description: "Built at Aiera — LLM inference pipelines and hybrid RAG retrieval (BM25 + vector search) for hedge funds and investment banks. 10,000+ req/min on AWS EKS with 35% P95 latency reduction.",
    tags: ["LangChain", "OpenSearch", "Claude", "MCP"],
    category: "LLM",
    icon: Building2,
    gradient: "from-blue-950/80 to-blue-900/40",
    badge: "Aiera x Anthropic",
    image: "/rag-pipeline.jpg"
  },
  {
    id: 2,
    title: "Fraud Detection System",
    description: "Built at Airtel — Sub-50ms real-time fraud detection and credit risk decisioning for Airtel Payments Bank processing millions of daily UPI transactions with Kafka-driven event streaming.",
    tags: ["Kafka", "Deep Learning", "Real-time"],
    category: "MLOps",
    icon: Shield,
    gradient: "from-violet-950/80 to-violet-900/40",
    image: "/distributed-network.jpg"
  },
  {
    id: 3,
    title: "E-commerce ML Platform",
    description: "Built at Flipkart — CTR prediction, ranking, and auction optimization sustaining 110+ orders/sec during Big Billion Days. Achieved 3x throughput improvement with Kubernetes autoscaling on Azure AKS.",
    tags: ["Spark", "Kubernetes", "Redis"],
    category: "Distributed",
    icon: ShoppingCart,
    gradient: "from-teal-950/80 to-teal-900/40",
    image: "/llm-brain.jpg"
  },
  {
    id: 4,
    title: "Driver Matching & Surge Pricing",
    description: "Built at Ola — Real-time ML inference for dynamic surge pricing and driver matching across 250+ cities. Engineered fault-tolerant orchestration with eventual consistency across distributed microservices.",
    tags: ["ML Inference", "Redis", "Microservices"],
    category: "Distributed",
    icon: Car,
    gradient: "from-green-950/80 to-green-900/40",
    image: "/rag-pipeline.jpg"
  },
  {
    id: 5,
    title: "LLM Observability Stack",
    description: "Full model observability platform with OpenTelemetry, Prometheus, and Grafana. A/B testing frameworks and SLA dashboards for Wall Street enterprise clients at 10,000+ req/min.",
    tags: ["OpenTelemetry", "Prometheus", "Grafana"],
    category: "MLOps",
    icon: BarChart3,
    gradient: "from-orange-950/80 to-orange-900/40",
    image: "/distributed-network.jpg"
  },
  {
    id: 6,
    title: "Semantic Search Pipeline",
    description: "High-performance vector search system with FAISS indexing and sentence transformers, achieving sub-10ms query latency at million-document scale with FastAPI backend.",
    tags: ["FAISS", "Sentence Transformers", "FastAPI"],
    category: "LLM",
    icon: Search,
    gradient: "from-purple-950/80 to-purple-900/40",
    image: "/llm-brain.jpg"
  }
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  )

  return (
    <section id="projects" className="py-20 md:py-32">
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
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Production-grade AI systems built end-to-end — from architecture to deployment.
          </p>
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
                className="group relative border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                {/* Background image + overlay — always rendered */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.75)" }} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <project.icon className="h-6 w-6" style={{ color: "#00C2FF" }} />
                  </div>

                  {/* Category badge */}
                  <span
                    className="inline-block px-2 py-1 text-xs rounded-md mb-2 font-semibold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {project.category}
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-md border"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          color: "#00C2FF",
                          borderColor: "#00C2FF",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl mb-2 font-[family-name:var(--font-poppins)]"
                    style={{ color: "#FFFFFF", fontWeight: 800 }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm mb-6 leading-relaxed"
                    style={{ color: "#E8F0FE" }}
                  >
                    {project.description}
                  </p>

                  {/* Badge if exists */}
                  {project.badge && (
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white/10 rounded-full border border-white/20" style={{ color: "#FFFFFF" }}>
                        <span>🤝</span> {project.badge}
                      </span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <a
                      href="https://medium.com/@guna050998/why-most-ai-projects-fail-after-the-demo-c2522de95ce0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm gap-1 group-hover:gap-2 transition-all"
                      style={{ color: "#00C2FF", fontWeight: 700 }}
                    >
                      Case Study
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button className="p-2 transition-colors" style={{ color: "#E8F0FE" }}>
                      <Github className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
