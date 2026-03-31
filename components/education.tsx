"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, GraduationCap, CheckCircle } from "lucide-react"

const educationData = [
  {
    period: "2024 – Present",
    degree: "Master of Science — Computer Science",
    school: "Northeastern University",
    location: "Boston, MA",
    points: [
      "Focus: Applied AI, Machine Learning Systems, Distributed Computing",
      "Relevant coursework: LLM Engineering, Cloud Systems, AI Product Development",
      "Applying ML research directly to production systems at Aiera"
    ]
  },
  {
    period: "2016 – 2020",
    degree: "Bachelor of Engineering — Computer Science",
    school: "Global Academy of Technology",
    location: "Bengaluru, India",
    points: [
      "Graduated with honors; strong foundation in algorithms and distributed systems",
      "Final year project: Semantic search system for academic literature",
      "Active in AI/ML clubs and technical competitions"
    ]
  }
]

const certifications = [
  "Chatbot Platform Foundation",
  "Java Certification",
  "Python Certification"
]

export function Education() {
  return (
    <section id="education" className="py-20 md:py-32">
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
            Education
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {/* Gradient vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 gradient-bg rounded-full hidden md:block" />

          <div className="space-y-8">
            {educationData.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 top-2 w-5 h-5 rounded-full bg-card border-2 border-primary hidden md:flex items-center justify-center">
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
                  
                  <div className="flex items-start gap-3 mb-1">
                    <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-poppins)]">
                        {item.degree}
                      </h3>
                      <p className="text-primary font-semibold">{item.school}</p>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2 ml-8">
                    {item.points.map((point, i) => (
                      <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                <CheckCircle className="h-4 w-4" />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
