import Seo from "../seo/Seo"
import { buildHomeJsonLd } from "../seo/jsonLd"
import { content } from "../data/content"
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
        title={`Plattenleger in Zürich & Schweiz | Badezimmer, Küchen & Bodenplatten | ${content.brand}`}
        description="Professioneller Plattenleger in der Schweiz. Spezialisiert auf Badezimmer, Küchen, Bodenplatten und Renovationen. Präzise Arbeit & faire Preise."
        path="/"
        jsonLd={buildHomeJsonLd(content)}
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

