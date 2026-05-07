import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PRAISES = [
  "Perfekte Verarbeitung",
  "Saubere Fugen",
  "Präzise Arbeit",
  "Langlebige Qualität",
  "Höchste Standards",
  "Millimetergenau",
  "Termingerecht",
  "Professionell",
  "Zuverlässig",
  "Erfahren",
]

const STATS = [
  { value: "25+", label: "Jahre Erfahrung" },
  { value: "500+", label: "Projekte" },
  { value: "100%", label: "Engagement" },
]

export default function TileShowcase() {
  const sectionRef = useRef(null)
  const row = [...PRAISES, ...PRAISES]

  useEffect(() => {
    if (!sectionRef.current) return
    const root = sectionRef.current

    const ctx = gsap.context(() => {
      const intro = root.querySelector("[data-tile-intro]")
      if (intro) {
        gsap.from(intro, {
          scrollTrigger: { trigger: root, start: "top 86%", once: true },
          opacity: 0,
          y: 18,
          duration: 0.55,
          ease: "power2.out",
        })
      }

      const marqueeWrap = root.querySelector("[data-tile-marquee-wrap]")
      if (marqueeWrap) {
        gsap.from(marqueeWrap, {
          scrollTrigger: { trigger: root, start: "top 84%", once: true },
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      const stats = root.querySelectorAll("[data-stat]")
      if (stats.length) {
        gsap.from(stats, {
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
          opacity: 0,
          y: 12,
          stagger: 0.07,
          duration: 0.45,
          ease: "power2.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-10 md:py-11 bg-[var(--color-bg)] border-y border-black/[0.05]">
      <div className="mx-auto w-full max-w-[80vw] px-6">
        <div data-tile-intro className="max-w-xl mx-auto text-center mb-5 md:mb-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight text-[var(--color-dark)] mb-2">
            Qualität im Detail
          </h2>
          <p className="font-[var(--font-body)] text-sm md:text-[0.9375rem] text-[var(--color-slate)] leading-relaxed text-safe">
            Präzise Verlegung, saubere Übergänge und Arbeit, die im Alltag überzeugt — ohne Schnickschnack.
          </p>
        </div>

        <div className="relative rounded-xl border border-black/10 bg-white/70 backdrop-blur overflow-hidden mb-5 md:mb-6 shadow-sm" data-tile-marquee-wrap>
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-10 z-[1] bg-gradient-to-r from-[var(--color-bg)] to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 z-[1] bg-gradient-to-l from-[var(--color-bg)] to-transparent"
            aria-hidden
          />
          <div className="py-3 md:py-3.5 overflow-hidden">
            <div className="tile-showcase__track">
              {row.map((text, i) => (
                <span
                  key={`${text}-${i}`}
                  className="inline-flex shrink-0 items-center rounded-full border border-black/10 bg-[var(--color-bg)] px-3 py-1.5 font-[var(--font-body)] text-xs font-semibold text-[var(--color-dark)] whitespace-nowrap shadow-sm"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="text-center px-2">
              <div className="text-xl md:text-2xl font-bold text-[var(--color-primary)] tabular-nums">{s.value}</div>
              <div className="font-[var(--font-body)] text-xs text-[var(--color-slate)] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
