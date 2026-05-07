import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import ImageLightbox from "../ui/ImageLightbox"

import a1 from "../../assets/a1.jpg"
import a2 from "../../assets/a2.jpg"
import a3 from "../../assets/a3.jpg"
import a4 from "../../assets/a4.jpg"
import b1 from "../../assets/b1.jpg"
import b2 from "../../assets/b2.jpg"
import b3 from "../../assets/b3.jpg"
import b4 from "../../assets/b4.jpg"
import b5 from "../../assets/b5.jpg"
import b6 from "../../assets/b6.jpg"
import b7 from "../../assets/b7.jpg"
import c1 from "../../assets/c1.jpg"
import c2 from "../../assets/c2.jpg"
import c3 from "../../assets/c3.jpg"
import c4 from "../../assets/c4.jpg"
import c5 from "../../assets/c5.jpg"
import f1 from "../../assets/f1.jpg"

const categories = [
  { id: "a", label: "Bad" },
  { id: "b", label: "Küche" },
  { id: "c", label: "Boden" },
  { id: "f", label: "Details" },
]

const byCategory = {
  a: [a1, a2, a3, a4],
  b: [b1, b2, b3, b4, b5, b6, b7],
  c: [c1, c2, c3, c4, c5],
  f: [f1],
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(!!mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  return reduced
}

export default function GalleryOrbit({ title = "Galerie", defaultCategory = "a" }) {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const orbitRef = useRef(null)
  const itemsRef = useRef([])

  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [lightboxImage, setLightboxImage] = useState(null)

  const images = useMemo(() => byCategory[activeCategory] || [], [activeCategory])

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, images.length)
  }, [images.length])

  useEffect(() => {
    const container = orbitRef.current
    if (!container) return
    const items = itemsRef.current.filter(Boolean)
    if (!items.length) return

    const ctx = gsap.context(() => {
      gsap.killTweensOf(items)
      gsap.set(items, { clearProps: "all" })

      if (reducedMotion) {
        // No orbit: show them as a neat grid on desktop too.
        gsap.set(container, { height: "auto" })
        return
      }

      // Circle layout (Apple-like “orbit”)
      const radius = 165
      const centerX = 0
      const centerY = 0

      gsap.set(container, { height: 420 })

      items.forEach((el, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        gsap.fromTo(
          el,
          { x: 0, y: 0, scale: 0.55, opacity: 0, rotate: -12 },
          {
            x,
            y,
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.9,
            delay: i * 0.03,
            ease: "expo.out",
          }
        )
      })

      // Subtle continuous rotation for prestige
      gsap.to(container, {
        rotate: 360,
        duration: 70,
        ease: "none",
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory, images, reducedMotion])

  const onSelectCategory = (id) => {
    setActiveCategory(id)
    const container = orbitRef.current
    if (!container || reducedMotion) return
    gsap.fromTo(container, { rotate: -12 }, { rotate: 0, duration: 0.7, ease: "expo.out" })
  }

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-[1100px] px-6 py-20">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="section-title mb-4 text-center md:text-left">{title}</h2>
          <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-3xl text-safe">
            Wählen Sie eine Kategorie – die Bilder ordnen sich mit einer eleganten Animation an. Tippen/Klicken Sie ein Bild, um es
            gross zu öffnen.
          </p>
        </div>

        {/* Horizontal category menu */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {categories.map((c) => {
            const isActive = c.id === activeCategory
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={[
                  "shrink-0 px-4 py-2 rounded-xl border transition-all whitespace-nowrap",
                  "font-[var(--font-body)] font-semibold",
                  isActive
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white/70 text-[var(--color-dark)] border-black/10 hover:border-[var(--color-primary)]/40 hover:bg-white",
                ].join(" ")}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Desktop orbit */}
        {!reducedMotion ? (
          <div className="hidden md:block">
            <div className="relative rounded-3xl border border-black/10 bg-white/60 backdrop-blur p-10 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-60 hero-media-frame rounded-3xl" />
              <div className="relative h-[420px] flex items-center justify-center">
                <div ref={orbitRef} className="relative w-[420px] h-[420px]">
                  {images.map((src, i) => (
                    <button
                      key={`${activeCategory}-${i}`}
                      ref={(el) => (itemsRef.current[i] = el)}
                      onClick={() => setLightboxImage(src)}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-2xl overflow-hidden border border-black/10 shadow-xl bg-gray-100 hover:scale-[1.04] transition-transform"
                      aria-label="Bild öffnen"
                    >
                      <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Mobile + reduced-motion friendly grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {images.map((src, i) => (
            <button
              key={`${activeCategory}-m-${i}`}
              onClick={() => setLightboxImage(src)}
              className="relative aspect-square rounded-2xl overflow-hidden border border-black/10 bg-gray-100 depth-shadow"
              aria-label="Bild öffnen"
            >
              <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {reducedMotion ? (
          <div className="hidden md:grid grid-cols-3 gap-4">
            {images.map((src, i) => (
              <button
                key={`${activeCategory}-d-${i}`}
                onClick={() => setLightboxImage(src)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 bg-gray-100 depth-shadow"
                aria-label="Bild öffnen"
              >
                <img src={src} alt={`${title} ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightboxImage ? (
        <ImageLightbox imageSrc={lightboxImage} altText="Galerie Bild" onClose={() => setLightboxImage(null)} />
      ) : null}
    </section>
  )
}

