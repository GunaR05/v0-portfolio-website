import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { CurrentlyBuilding } from "@/components/currently-building"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <CurrentlyBuilding />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
