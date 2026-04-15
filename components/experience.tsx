"use client"

import { motion, useInView } from "framer-motion"
import { Puzzle, Link2, Rocket, Target, Calendar, MapPin, Handshake } from "lucide-react"
import { useRef } from "react"

const timeline = [
  {
    period: "May 2025 – Present",
    title: "Software Engineer — ML & AI Systems",
    company: "Aiera",
    location: "Boston, MA",
    points: [
      "Built LLM inference pipelines and RAG-based hybrid retrieval (BM25 + vector search) using LangChain and OpenSearch, powering real-time financial research for hedge funds and investment banks.",
      "Led MCP server development for the official Aiera × Anthropic integration, enabling Claude for Financial Services to access Aiera's verified market intelligence covering 45,000+ annual investor events across 13,000+ global companies.",
      "Scaled ML inference on AWS EKS to 10,000+ requests/min, reducing P95 latency by 35% through Redis caching, async pipelines, and query optimization.",
      "Established full model observability using OpenTelemetry, Prometheus, and Grafana with A/B testing frameworks and SLA dashboards for Wall Street enterprise clients.",
      "Built full-stack React and TypeScript research interfaces integrating live transcripts, model outputs, and real-time analytics via enterprise-grade APIs."
    ],
    featured: {
      tag: "Aiera × Anthropic Official Integration",
      text: "Contributed to the official Aiera × Anthropic partnership — built the MCP server integrating Aiera's trusted market intelligence into Claude for Financial Services. Covers 45,000+ annual events across 13,000+ global companies. Part of Anthropic's Financial Analysis Solution for institutional investors.",
      stats: ["45K+ Events", "13K+ Companies", "100+ Macro Entities"]
    }
  },
  {
    period: "Oct 2023 – Sep 2024",
    title: "Senior Software Development Engineer",
    company: "Flipkart",
    location: "Bengaluru, India",
    points: [
      "Architected distributed ML platform for product search, dynamic pricing, and recommendations including CTR prediction, ranking, and auction optimization serving hundreds of millions of users.",
      "Achieved 3x throughput improvement sustaining 110+ orders/sec during Big Billion Days through async workflows, distributed caching, and Kubernetes autoscaling on Azure AKS.",
      "Built Spark-based ETL pipelines processing terabytes of user interaction data ensuring feature freshness for ML model training and serving.",
      "Reduced production incidents by 30% and root-cause resolution time by 40% via Prometheus observability, distributed tracing, and anomaly detection.",
      "Delivered high-performance React, TypeScript, and Redux applications and shared component libraries serving hundreds of millions of users."
    ]
  },
  {
    period: "Jul 2022 – Oct 2023",
    title: "Senior Software Development Engineer",
    company: "Airtel Digital",
    location: "Bengaluru, India",
    points: [
      "Delivered real-time fraud detection and credit risk decisioning at sub-50ms latency for Airtel Payments Bank applying deep learning and GenAI patterns across high-volume payment flows.",
      "Engineered Kafka-driven event streaming and ML feature pipelines for RBI-regulated financial decisioning with end-to-end traceability and compliance.",
      "Architected CI/CD reliability across 10+ financial microservices using Jenkins, Docker, and Kubernetes with zero-downtime deployments and automated rollback.",
      "Built React.js internal dashboards for credit and fraud decisioning flows improving engineer visibility into production ML system health.",
      "Drove API governance across 5+ engineering teams establishing schema contracts and versioning policies that eliminated integration failures."
    ]
  },
  {
    period: "Aug 2020 – Jul 2022",
    title: "Software Development Engineer",
    company: "Ola",
    location: "Bengaluru, India",
    points: [
      "Built scalable backend services for real-time driver allocation, order orchestration, and marketplace matching across 250+ cities during peak demand surges.",
      "Developed real-time ML inference and feature serving for dynamic surge pricing and driver matching models optimizing low-latency predictions across distributed systems.",
      "Engineered fault-tolerant workflow orchestration spanning driver matching, surge pricing, and Ola Money wallet payments with eventual consistency across microservices.",
      "Optimized platform reliability through Redis caching, async processing, and API traffic management via Envoy Proxy and Kong Gateway.",
      "Built TypeScript and React.js consumer features used by millions of riders supporting real-time driver allocation, order tracking, and payment workflows."
    ]
  },
  {
    period: "Jan 2020 – Jul 2020",
    title: "Conversational AI Intern",
    company: "Avaamo",
    location: "Bengaluru, India",
    points: [
      "Built and optimized conversational AI and NLP pipelines for enterprise clients including Ericsson, LIC India, and AB InBev.",
      "Designed annotation pipelines and validation workflows reducing production error rates by 10% and improving intent classification accuracy.",
      "Raised customer satisfaction by 18% through improvements in ranking, information retrieval, and semantic search techniques.",
      "Developed TypeScript and React.js conversational AI frontend interfaces resolving UI bottlenecks across enterprise deployments.",
      "Designed and executed API-level integration test suites validating response accuracy, latency, and intent classification correctness at production volumes."
    ]
  }
]

const specializations = [
  {
    icon: Puzzle,
    title: "End-to-End AI System Design",
    description: "Complete pipelines from data ingestion to production deployment."
  },
  {
    icon: Link2,
    title: "LLM + Semantic Search Integration",
    description: "Combining language models with vector databases for intelligent retrieval."
  },
  {
    icon: Rocket,
    title: "Production-Focused Engineering",
    description: "Scalable, reliable systems performing under real-world conditions."
  },
  {
    icon: Target,
    title: "Product-Oriented AI Development",
    description: "Aligning AI capabilities with user needs and business outcomes."
  }
]

export function Experience() {
  const timelineRef = useRef(null)
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
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
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Left - Timeline (2 columns) */}
          <div ref={timelineRef} className="lg:col-span-2 relative">
            {/* Animated gradient vertical line */}
            <motion.div 
              className="absolute left-4 top-0 bottom-0 w-0.5 gradient-bg rounded-full hidden md:block origin-top"
              initial={{ scaleY: 0 }}
              animate={isTimelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative md:pl-12"
                >
                  {/* Timeline dot with pulse */}
                  <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-card border-2 border-primary hidden md:flex items-center justify-center timeline-dot-pulse">
                    <div className="w-2 h-2 rounded-full gradient-bg" />
                  </div>

                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.period}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {item.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                      {item.title}
                    </h3>
                    <p className="text-primary font-semibold mt-1">{item.company}</p>
                    
                    <ul className="mt-4 space-y-2">
                      {item.points.map((point, i) => (
                        <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Featured Achievement Card */}
                    {item.featured && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 p-4 rounded-lg border-2 border-transparent bg-gradient-to-r from-primary/10 to-secondary/10"
                        style={{
                          background: 'linear-gradient(var(--card), var(--card)) padding-box, linear-gradient(135deg, #00C2FF, #7B61FF) border-box',
                          border: '2px solid transparent'
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Handshake className="h-4 w-4 text-primary" />
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                            {item.featured.tag}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.featured.text}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-4">
                          {item.featured.stats.map((stat) => (
                            <span key={stat} className="text-xs font-semibold text-foreground bg-muted px-3 py-1.5 rounded-full">
                              {stat}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Specializations */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <h3 className="text-lg font-bold text-foreground mb-4 font-[family-name:var(--font-poppins)]">
              Specializations
            </h3>
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <spec.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-1 font-[family-name:var(--font-poppins)]">
                  {spec.title}
                </h4>
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
