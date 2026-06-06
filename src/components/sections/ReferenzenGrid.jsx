import { useEffect, useMemo, useState } from "react"
import ImageLightbox from "../ui/ImageLightbox"
import { filterReferences, references } from "../../data/references"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

const DEFAULT_ROTATE_MS = 5500

/**
 * Clean portfolio grid — uniform tiles, optional category filter.
 * compact: smaller cells for homepage / landing page embeds.
 */
export default function ReferenzenGrid({
  items = references,
  showFilters = false,
  defaultFilter = "all",
  limit,
  compact = false,
  autoRotate = false,
  rotateIntervalMs = DEFAULT_ROTATE_MS,
  className = "",
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [activeFilter, setActiveFilter] = useState(defaultFilter)
  const [lightbox, setLightbox] = useState(null)
  const [offset, setOffset] = useState(0)
  const [paused, setPaused] = useState(false)

  const filtered = useMemo(() => filterReferences(items, activeFilter), [items, activeFilter])
  const n = filtered.length

  useEffect(() => {
    if (!autoRotate || !limit || reducedMotion || paused || n <= limit) return
    const id = window.setInterval(() => {
      setOffset((o) => (o + 1) % n)
    }, rotateIntervalMs)
    return () => window.clearInterval(id)
  }, [autoRotate, limit, reducedMotion, paused, n, rotateIntervalMs])

  const visible = useMemo(() => {
    if (!limit) return filtered
    if (!autoRotate || n <= limit) return filtered.slice(0, limit)
    return Array.from({ length: limit }, (_, i) => filtered[(offset + i) % n])
  }, [filtered, limit, autoRotate, offset, n])

  const cellClass = compact
    ? "aspect-[4/3] rounded-lg"
    : "aspect-[4/3] sm:aspect-[5/4] rounded-xl"

  const gridClass = compact
    ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5"
    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"

  return (
    <>
      {showFilters ? (
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {/* Category filters disabled by default — enable with showFilters */}
        </div>
      ) : null}

      <div
        className={[gridClass, className].join(" ")}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
        }}
      >
        {visible.map((item, i) => (
          <button
            key={autoRotate ? `${item.id}-${offset}-${i}` : item.id}
            type="button"
            onClick={() => setLightbox({ src: item.src, alt: item.title })}
            className={[
              "group relative overflow-hidden border border-black/10 bg-[var(--color-dark)] shadow-sm text-left",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2",
              autoRotate ? "referenzen-cell-enter" : "",
              cellClass,
            ].join(" ")}
            aria-label={`${item.title} vergrössern`}
          >
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 group-focus-visible:bg-black/35 transition-colors duration-300" />
            {!compact ? (
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-300">
                <p className="text-[11px] sm:text-xs font-semibold text-white leading-snug">{item.title}</p>
              </div>
            ) : null}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-sm text-[var(--color-slate)] py-8">Keine Bilder in dieser Kategorie.</p>
      ) : null}

      {lightbox ? (
        <ImageLightbox imageSrc={lightbox.src} altText={lightbox.alt} onClose={() => setLightbox(null)} />
      ) : null}
    </>
  )
}
