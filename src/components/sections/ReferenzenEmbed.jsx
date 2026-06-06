import { Link } from "react-router-dom"
import ReferenzenGrid from "./ReferenzenGrid"

/** Compact reference block for landing pages. */
export default function ReferenzenEmbed({
  title = "Referenzen",
  defaultFilter = "all",
  limit = 8,
}) {
  return (
    <section className="py-10 sm:py-12 border-y border-black/[0.05] bg-white/40">
      <div className="content-shell content-shell--article">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
          <h2 className="section-title">{title}</h2>
          <Link
            to="/referenzen"
            className="inline-flex shrink-0 text-sm font-semibold text-[var(--color-primary)] hover:underline underline-offset-4"
          >
            Alle Referenzen →
          </Link>
        </div>
        <ReferenzenGrid defaultFilter={defaultFilter} limit={limit} compact showFilters={false} />
      </div>
    </section>
  )
}
