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
        title={`Plattenleger Zürich & Schweiz | Jeder Fliesenauftrag – Pool, Bad, Küche & mehr | ${content.brand}`}
        description="Wir übernehmen jeden Auftrag im Fliesen- und Plattenbereich: Pool, Bad, Küche, Schlafzimmer, Wohnraum, Treppen, Terrasse, Gehwege, Pflaster und Gewerbe. Jede Fliesenart – Zürich, Trimbach und Umgebung."
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

