import { useEffect, useRef, useState } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import ImageLightbox from "../ui/ImageLightbox"
import { references } from "../../data/references"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useReveal } from "../../hooks/useReveal"

// Kept outside React so a photo never replays its entrance after route changes.
// A full browser refresh intentionally resets the collection.
const revealedReferenceIds = new Set()

function ReferencePhoto({ item, onOpen, delay }) {
  const photoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [revealState, setRevealState] = useState(() =>
    revealedReferenceIds.has(item.id) ? "settled" : "hidden"
  )

  useEffect(() => {
    const element = photoRef.current
    if (!element || revealState !== "hidden") return

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      revealedReferenceIds.add(item.id)
      const frame = window.requestAnimationFrame(() => setRevealState("settled"))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        revealedReferenceIds.add(item.id)
        setRevealState("revealing")
        observer.disconnect()
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -6% 0px",
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [revealState, reducedMotion, item.id])

  return (
    <li
      ref={photoRef}
      className={[
        "reference-rail__item",
        `is-${revealState}`,
      ].join(" ")}
      onAnimationEnd={() => {
        if (revealState === "revealing") setRevealState("settled")
      }}
      style={{
        "--photo-delay": `${delay}ms`,
      }}
    >
      <button
        type="button"
        className="reference-rail__button group"
        onClick={() => onOpen(item)}
        aria-label={`${item.title} vergrössern`}
      >
        <img
          src={item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
        />
      </button>
    </li>
  )
}

export default function GalleryPreview() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)
  const [scrollState, setScrollState] = useState({ previous: false, next: true })

  useReveal(sectionRef)

  useEffect(() => {
    const node = railRef.current
    if (!node) return

    const updateScrollState = () => {
      const maxScroll = node.scrollWidth - node.clientWidth
      setScrollState({
        previous: node.scrollLeft > 8,
        next: node.scrollLeft < maxScroll - 8,
      })
    }

    const frame = window.requestAnimationFrame(updateScrollState)
    const resizeObserver = new ResizeObserver(updateScrollState)

    node.addEventListener("scroll", updateScrollState, { passive: true })
    resizeObserver.observe(node)

    return () => {
      window.cancelAnimationFrame(frame)
      node.removeEventListener("scroll", updateScrollState)
      resizeObserver.disconnect()
    }
  }, [])

  const scrollRail = (direction) => {
    railRef.current?.scrollBy({
      left: direction * Math.max(320, railRef.current.clientWidth * 0.78),
      behavior: "smooth",
    })
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-band overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-labelledby="references-title"
    >
      <div className="content-shell">
        <div data-reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="eyebrow mb-3">Plattenleger-Referenzen</p>
          <h2 id="references-title" className="section-title mb-4">
            Präzise ausgeführte Plattenarbeiten
          </h2>
          <p className="mx-auto max-w-[68ch] font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] sm:text-base">
            Entdecken Sie Referenzen der Plattenleger Jaho GmbH. Als erfahrener Plattenleger realisieren
            wir private und gewerbliche Projekte zuverlässig — von der sorgfältigen Vorbereitung bis zur
            präzisen Verlegung und sauberen Fertigstellung in Zürich, Trimbach und Umgebung.
          </p>
        </div>

        <div data-reveal className="reference-rail-shell">
          <ul
            ref={railRef}
            className="reference-rail"
            aria-label="Ausgeführte Plattenarbeiten"
          >
            {references.map((item, index) => (
              <ReferencePhoto
                key={item.id}
                item={item}
                delay={(index % 4) * 65}
                onOpen={setLightbox}
              />
            ))}
          </ul>

          <button
            type="button"
            className="reference-rail__control reference-rail__control--previous"
            onClick={() => scrollRail(-1)}
            disabled={!scrollState.previous}
            aria-label="Vorherige Referenzen"
          >
            <FiArrowLeft size={19} aria-hidden />
          </button>
          <button
            type="button"
            className="reference-rail__control reference-rail__control--next"
            onClick={() => scrollRail(1)}
            disabled={!scrollState.next}
            aria-label="Nächste Referenzen"
          >
            <FiArrowRight size={19} aria-hidden />
          </button>
        </div>
      </div>

      {lightbox ? (
        <ImageLightbox
          imageSrc={lightbox.src}
          altText={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
