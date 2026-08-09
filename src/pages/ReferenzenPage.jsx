import { Link } from "react-router-dom"
import Seo from "../seo/Seo"
import { content } from "../data/content"
import BackToHome from "../components/layout/BackToHome"
import ReferenzenGrid from "../components/sections/ReferenzenGrid"

export default function ReferenzenPage() {
  return (
    <>
      <Seo
        title={`Referenzen & Projekte | Plattenleger ${content.brand}`}
        description="Referenzprojekte von Plattenleger Jaho GmbH: Badezimmer, Küchenfliesen, Bodenplatten und Detailarbeiten in der Schweiz."
        path="/referenzen"
      />

      <section className="section-band pt-24 sm:pt-28 pb-10 sm:pb-12">
        <div className="content-shell content-shell--article">
          <BackToHome className="mb-6" />
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)] mb-2">
            Portfolio
          </p>
          <h1 className="hero-title mb-4 max-w-3xl">Referenzen & abgeschlossene Projekte</h1>
          <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-2xl text-safe">
            Ein Überblick über unsere Arbeit — von Nasszellen und Küchen bis zu Bodenflächen und präzisen
            Detailanschlüssen. Klicken Sie auf ein Bild für die Grossansicht.
          </p>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="content-shell content-shell--article">
          <ReferenzenGrid showFilters={false} compact={false} />
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-white/50 py-10">
        <div className="content-shell content-shell--article text-center">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)] mb-2">
            Ihr Projekt als nächste Referenz?
          </h2>
          <p className="font-[var(--font-body)] text-sm md:text-base text-[var(--color-slate)] mb-5 max-w-lg mx-auto">
            Wir beraten Sie gerne zu Material, Format und Umsetzung — unverbindlich und transparent.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/#contact"
              className="inline-flex px-5 py-2.5 rounded-xl font-semibold text-sm bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              Offerte anfragen
            </Link>
            <Link
              to="/"
              className="inline-flex px-5 py-2.5 rounded-xl font-semibold text-sm border border-black/10 bg-white text-[var(--color-dark)] hover:bg-[var(--color-bg)] transition-colors"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
