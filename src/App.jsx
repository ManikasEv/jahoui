import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import PlattenlegerZuerich from "./pages/PlattenlegerZuerich"
import BadRenovationZuerich from "./pages/BadRenovationZuerich"
import KuecheFliesenZuerich from "./pages/KuecheFliesenZuerich"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()

  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const hash = location.hash

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      ScrollTrigger.refresh(true)
      return
    }

    // If we have a hash, scroll to that section after paint.
    const id = hash.replace("#", "")
    const t = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      ScrollTrigger.refresh(true)
    }, 0)

    return () => window.clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] overflow-x-hidden relative">
      <div
        aria-hidden="true"
        className="app-bg-wash pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(196,30,58,0.06),transparent_55%)]"
      />

      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plattenleger-zuerich" element={<PlattenlegerZuerich />} />
          <Route path="/badrenovation-zuerich" element={<BadRenovationZuerich />} />
          <Route path="/kueche-fliesen-zuerich" element={<KuecheFliesenZuerich />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
