import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { createCursorFollower } from "./utils/magneticEffect"
import Navbar from "./components/layout/Navbar"
import Hero from "./components/hero/Hero"
import About from "./components/sections/About"
import Clients from "./components/sections/Clients"
import Projects from "./components/sections/Projects"
import Contact from "./components/sections/Contact"
import Footer from "./components/layout/Footer"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    })

    // Initialize cursor follower
    const cleanupCursor = createCursorFollower()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      cleanupCursor()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] overflow-x-hidden relative">
      {/* Decorative glowing elements */}
      <svg className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Organic flowing lines */}
        <path
          className="glow-element"
          d="M 100 300 Q 300 200, 500 300 T 900 300"
          stroke="var(--color-primary)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
        />
        <path
          className="glow-element"
          d="M 200 600 Q 400 500, 600 600 T 1000 600"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          style={{ animationDelay: '1s' }}
        />
        <path
          className="glow-element"
          d="M 50 150 Q 200 100, 350 150 T 650 150"
          stroke="var(--color-primary)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Clients />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
