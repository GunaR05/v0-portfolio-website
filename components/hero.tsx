"use client"

import { motion } from "framer-motion"
import { Download, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const codeSnippet = `from langchain import OpenAI, PromptTemplate
from pinecone import Pinecone

class AIDocumentPipeline:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4")
        self.vectordb = Pinecone()
    
    async def process_query(self, query: str):
        # Semantic search + LLM generation
        context = await self.vectordb.search(query)
        response = self.llm.generate(
            prompt=self._build_prompt(query, context)
        )
        return response`

export function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector("#projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-background" />
      <div className="absolute inset-0 radial-glow" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-muted-foreground">Available for Opportunities</span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-poppins)] leading-tight">
                Gunashree
                <br />
                <span className="gradient-text">Rajakumar</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary font-semibold"
            >
              Applied AI Systems Engineer
            </motion.p>

            {/* UVP paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              I design production-ready AI systems that combine large language models, 
              semantic search, and scalable backend engineering — transforming AI prototypes 
              into reliable, high-performance intelligent products.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-muted"
                asChild
              >
                <a href="/cv.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right content - Code card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                {/* Code header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-sm text-muted-foreground font-mono">ai_pipeline.py</span>
                </div>
                
                {/* Code content */}
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => (
                      <div key={i} className="leading-6">
                        <span className="text-muted-foreground mr-4 select-none">{String(i + 1).padStart(2, ' ')}</span>
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightCode(line) 
                        }} />
                      </div>
                    ))}
                  </code>
                </pre>

                {/* Stats row */}
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <div className="flex items-center gap-6">
                    <span className="text-primary font-semibold">5+ AI Projects</span>
                    <span className="text-secondary font-semibold">3+ LLM Apps</span>
                    <span className="text-accent font-semibold">MS Northeastern</span>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function highlightCode(line: string): string {
  return line
    .replace(/(from|import|class|def|async|await|return|self)/g, '<span style="color: #7B61FF">$1</span>')
    .replace(/(OpenAI|PromptTemplate|Pinecone|AIDocumentPipeline)/g, '<span style="color: #00E5C3">$1</span>')
    .replace(/(".*?")/g, '<span style="color: #00C2FF">$1</span>')
    .replace(/(#.*)/g, '<span style="color: #8BA3BC">$1</span>')
    .replace(/(\.__init__|\.search|\.generate|\.llm|\.vectordb|_build_prompt)/g, '<span style="color: #00C2FF">$1</span>')
}
