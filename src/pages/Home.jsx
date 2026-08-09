import Seo from "../seo/Seo"
import { buildHomeJsonLd } from "../seo/jsonLd"
import { content } from "../data/content"
import Hero from "../components/hero/Hero"
import About from "../components/sections/About"
import Clients from "../components/sections/Clients"
import TileShowcase from "../components/sections/TileShowcase"
import Contact from "../components/sections/Contact"
import GalleryPreview from "../components/sections/GalleryPreview"
import Faq from "../components/sections/Faq"

export default function Home() {
  return (
    <>
      <Seo
        title={`Plattenleger Zürich & Schweiz | Professionelle Plattenarbeiten | ${content.brand}`}
        description="Plattenleger Jaho GmbH für professionelle Plattenarbeiten in Zürich, Trimbach und Umgebung. Präzise Verlegung, zuverlässige Ausführung und persönliche Beratung."
        path="/"
        jsonLd={buildHomeJsonLd(content)}
      />
      <Hero />
      <About />
      <Clients />
      <TileShowcase />
      <GalleryPreview />
      <Faq />
      <Contact />
    </>
  )
}

