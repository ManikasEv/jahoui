import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useSectionCrossFade } from "../../hooks/useSectionCrossFade"

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

const TILE_TITLE = "Qualität im Detail"
const TILE_BODY =
  "Präzise Verlegung, saubere Übergänge und Arbeit, die im Alltag überzeugt — ohne Schnickschnack."

export default function TileShowcase() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const row = [...PRAISES, ...PRAISES]

  useSectionCrossFade(sectionRef, reducedMotion)

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return

    const root = sectionRef.current

    const ctx = gsap.context(() => {
      const stMain = { trigger: root, start: "top 84%", once: true }

      const titleChars = root.querySelectorAll("[data-tile-title-char]")
      if (titleChars.length) {
        gsap.from(titleChars, {
          scrollTrigger: stMain,
          opacity: 0,
          y: (i) => (i % 2 === 0 ? -18 : 18),
          rotateZ: (i) => (i % 3 === 0 ? -12 : i % 3 === 1 ? 10 : 0),
          stagger: 0.03,
          duration: 0.58,
          ease: "back.out(1.4)",
        })
      }

      const introWords = root.querySelectorAll("[data-tile-intro-word]")
      if (introWords.length) {
        gsap.from(introWords, {
          scrollTrigger: stMain,
          opacity: 0,
          y: 14,
          skewX: -5,
          stagger: 0.022,
          duration: 0.42,
          ease: "power2.out",
          delay: 0.1,
        })
      }

      const marqueeWrap = root.querySelector("[data-tile-marquee-wrap]")
      if (marqueeWrap) {
        gsap.from(marqueeWrap, {
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
          opacity: 0,
          y: 22,
          scale: 0.97,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.14,
        })
      }

      const stats = root.querySelectorAll("[data-stat]")
      if (stats.length) {
        gsap.from(stats, {
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
          opacity: 0,
          y: 22,
          rotateX: -18,
          transformOrigin: "50% 50%",
          stagger: 0.09,
          duration: 0.52,
          ease: "power3.out",
          delay: 0.2,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative py-10 md:py-11 bg-[var(--color-bg)] border-y border-black/[0.05] perspective-[1100px]">
      <div className="mx-auto w-full min-w-0 content-shell">
        <div data-tile-intro className="w-full min-w-0 max-w-xl mx-auto text-center mb-5 md:mb-6 px-0">
          <h2 className="section-title font-bold mb-2 [transform-style:preserve-3d]">
            {reducedMotion ? (
              TILE_TITLE
            ) : (
              TILE_TITLE.split("").map((char, i) => (
                <span key={`tt-${i}`} data-tile-title-char className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))
            )}
          </h2>
          <p className="font-[var(--font-body)] text-sm md:text-[0.9375rem] text-[var(--color-slate)] leading-relaxed text-safe">
            {reducedMotion ? (
              TILE_BODY
            ) : (
              TILE_BODY.split(/\s+/).filter(Boolean).map((word, i) => (
                <span key={`tb-${i}`} data-tile-intro-word className="inline-block mr-[0.22em]">
                  {word}
                </span>
              ))
            )}
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

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-14 [transform-style:preserve-3d]">
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
