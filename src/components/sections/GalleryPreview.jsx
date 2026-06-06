import { Link } from "react-router-dom"
import ReferenzenGrid from "./ReferenzenGrid"
import { references } from "../../data/references"

/** Compact homepage preview — low height, links to full portfolio page. */
export default function GalleryPreview() {
  return (
    <section id="gallery" className="section-band section-band--gallery py-12 sm:py-14">
      <div className="content-shell">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)] mb-1.5">
              Portfolio
            </p>
            <h2 className="section-title mb-2 leading-tight">Referenzen</h2>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed">
              Ausgewählte Projekte aus Bad, Küche und Boden — präzise verlegt und sauber ausgeführt.
            </p>
          </div>
          <Link
            to="/referenzen"
            className="inline-flex shrink-0 items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors shadow-sm"
          >
            Alle Referenzen ansehen
          </Link>
        </div>

        <ReferenzenGrid items={references} showFilters={false} limit={10} compact />
      </div>
    </section>
  )
}
