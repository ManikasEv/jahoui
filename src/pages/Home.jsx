import Seo from "../seo/Seo"
import Hero from "../components/hero/Hero"
import About from "../components/sections/About"
import Clients from "../components/sections/Clients"
import TileShowcase from "../components/sections/TileShowcase"
import Contact from "../components/sections/Contact"
import GalleryShowcase from "../components/sections/GalleryShowcase"
import Faq from "../components/sections/Faq"

export default function Home() {
  return (
    <>
      <Seo
        title="Plattenleger Zürich – Bad, Küche & Boden | Jaho Plattenleger"
        description="Professioneller Plattenleger in Zürich für Badezimmer, Küchen und Böden. Saubere Arbeit, faire Preise und schnelle Umsetzung. Jetzt Offerte anfragen!"
        path="/"
      />
      <Hero />
      <About />
      <Clients />
      <TileShowcase />
      <GalleryShowcase title="Referenzen" />
      <Faq />
      <Contact />
    </>
  )
}

