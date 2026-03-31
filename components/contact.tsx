"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "rajakumar.g@northeastern.edu",
    href: "mailto:rajakumar.g@northeastern.edu"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (617) 318-7385",
    href: "tel:+16173187385"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/rajakumargunashree",
    href: "https://linkedin.com/in/rajakumargunashree"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/gunashree-rajakumar",
    href: "https://github.com/gunashree-rajakumar"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Boston, MA — Open to NYC · SF · Seattle · Remote",
    href: null
  }
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
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
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-poppins)]">
            Let&apos;s <span className="gradient-text">Build Together</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Open to Senior SWE, Staff MLE, and AI Engineer roles. Let&apos;s connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {contactLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ x: 5 }}
                className="group"
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{link.label}</p>
                      <p className="font-medium text-foreground truncate">{link.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{link.label}</p>
                      <p className="font-medium text-foreground">{link.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
