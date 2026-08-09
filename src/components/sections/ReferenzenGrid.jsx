import { useState } from "react"
import ImageLightbox from "../ui/ImageLightbox"
import { references } from "../../data/references"

/**
 * Clean reference grid — uniform photo tiles without category controls.
 * compact: smaller cells for homepage / landing page embeds.
 */
export default function ReferenzenGrid({
  items = references,
  limit,
  compact = false,
  className = "",
}) {
  const [lightbox, setLightbox] = useState(null)
  const visible = limit ? items.slice(0, limit) : items

  const cellClass = compact
    ? "aspect-[4/3] rounded-xl"
    : "aspect-[4/3] sm:aspect-[5/4] rounded-xl"

  const gridClass = compact
    ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5"
    : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"

  return (
    <>
      <div
        className={[gridClass, className].join(" ")}
      >
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox({ src: item.src, alt: item.title })}
            className={[
              "group relative overflow-hidden border border-black/[0.06] bg-[var(--color-dark)] shadow-[var(--shadow-card)] text-left",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/50 focus-visible:ring-offset-2",
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
