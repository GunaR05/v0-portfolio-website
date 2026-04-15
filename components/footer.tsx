"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Newspaper } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/gunashree-rajakumar", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/rajakumargunashree", label: "LinkedIn" },
  { icon: Mail, href: "mailto:rajakumar.g@northeastern.edu", label: "Email" },
  { icon: Newspaper, href: "https://gunashree.substack.com", label: "Systems That Scale" },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">G</span>
            </div>
            <div>
              <p className="font-bold text-foreground font-[family-name:var(--font-poppins)]">Gunashree Rajakumar</p>
              <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </motion.nav>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-end gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2026 Gunashree Rajakumar
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
