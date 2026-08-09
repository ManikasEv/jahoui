import { useRef } from "react"
import { Link } from "react-router-dom"
import ReferenzenGrid from "./ReferenzenGrid"
import { references } from "../../data/references"
import { useReveal } from "../../hooks/useReveal"

/** Compact homepage preview — low height, links to full portfolio page. */
export default function GalleryPreview() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section id="gallery" ref={sectionRef} className="section-band py-16 sm:py-20">
      <div className="content-shell">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal className="max-w-lg">
            <p className="eyebrow mb-3">Portfolio</p>
            <h2 className="section-title mb-3">Referenzen</h2>
            <p className="font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] sm:text-base">
              Ausgewählte Projekte aus Bad, Küche und Boden — präzise verlegt und sauber ausgeführt.
            </p>
          </div>
          <Link data-reveal to="/referenzen" className="btn btn--outline btn--md shrink-0 self-start sm:self-auto">
            Alle Referenzen ansehen
          </Link>
        </div>

        <div data-reveal>
          <ReferenzenGrid items={references} showFilters={false} limit={10} compact autoRotate />
        </div>
      </div>
    </section>
  )
}
