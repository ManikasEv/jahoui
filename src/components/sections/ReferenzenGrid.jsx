import { useEffect, useMemo, useRef, useState } from "react"
import ImageLightbox from "../ui/ImageLightbox"
import { filterReferences, references, REFERENCE_FILTERS } from "../../data/references"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import {
  pickInitialGalleryFrame,
  pickNextGalleryFrame,
  shuffleItems,
} from "../../utils/galleryRotation"

const DEFAULT_ROTATE_MS = 5000

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
  const [rotatingVisible, setRotatingVisible] = useState(null)
  const [frameKey, setFrameKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const cycleRef = useRef({ deck: [], deckIndex: 0 })
  const lastFrameRef = useRef(null)

  const filtered = useMemo(() => filterReferences(items, activeFilter), [items, activeFilter])
  const n = filtered.length
  const canRotate = autoRotate && limit && n > limit

  useEffect(() => {
    if (!canRotate) {
      setRotatingVisible(null)
      return
    }

    const deck = shuffleItems(filtered)
    cycleRef.current = { deck, deckIndex: 0 }
    const initial = pickInitialGalleryFrame(filtered, limit)
    lastFrameRef.current = initial
    setRotatingVisible(initial)
    setFrameKey((k) => k + 1)
  }, [filtered, canRotate, limit])

  useEffect(() => {
    if (!canRotate || reducedMotion || paused) return

    const id = window.setInterval(() => {
      const previous = lastFrameRef.current ?? pickInitialGalleryFrame(filtered, limit)
      const next = pickNextGalleryFrame(filtered, previous, limit, cycleRef.current)
      lastFrameRef.current = next
      setRotatingVisible(next)
      setFrameKey((k) => k + 1)
    }, rotateIntervalMs)

    return () => window.clearInterval(id)
  }, [canRotate, filtered, limit, reducedMotion, paused, rotateIntervalMs])

  const visible = useMemo(() => {
    if (!limit) return filtered
    if (!canRotate) return filtered.slice(0, limit)
    return rotatingVisible ?? filtered.slice(0, limit)
  }, [filtered, limit, canRotate, rotatingVisible])

  const cellClass = compact
    ? "aspect-[4/3] rounded-xl"
    : "aspect-[4/3] sm:aspect-[5/4] rounded-xl"

  const gridClass = compact
    ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5"
    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"

  return (
    <>
      {showFilters ? (
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {REFERENCE_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={[
                "px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors border",
                activeFilter === f.id
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-white text-[var(--color-slate)] border-black/10 hover:border-[var(--color-primary)]/30 hover:text-[var(--color-dark)]",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
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
            key={canRotate ? `${item.id}-${frameKey}-${i}` : item.id}
            type="button"
            onClick={() => setLightbox({ src: item.src, alt: item.title })}
            className={[
              "group relative overflow-hidden border border-black/[0.06] bg-[var(--color-dark)] shadow-[var(--shadow-card)] text-left",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2",
              canRotate ? "referenzen-cell-enter" : "",
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
