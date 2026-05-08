import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ImageLightbox from "../ui/ImageLightbox"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useSectionCrossFade } from "../../hooks/useSectionCrossFade"

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

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    src: a1,
    title: "Bad – Wand & Boden",
    tags: ["Bad", "Fugenbild", "präzise"],
    quote: "„Wenn Linien stimmen, wirkt der ganze Raum ruhiger.“",
  },
  {
    src: a2,
    title: "Küche – Rückwand",
    tags: ["Küche", "pflegeleicht", "modern"],
    quote: "„Sauber bis ins Detail – genau dort, wo man täglich hinschaut.“",
  },
  {
    src: a3,
    title: "Boden – Wohnbereich",
    tags: ["Boden", "stabil", "langlebig"],
    quote: "„Ein Boden, der Jahre trägt – ohne Kompromisse.“",
  },
  {
    src: a4,
    title: "Bad – Duschzone",
    tags: ["Bad", "Gefälle", "Dichtung"],
    quote: "„Technik unsichtbar, Ergebnis spürbar.“",
  },
  { src: b1, title: "Treppen & Kanten", tags: ["Kanten", "Schutz", "sauber"], quote: "„Kanten sind Charakter – dort zeigt sich Qualität.“" },
  { src: b2, title: "Großformat – Fläche", tags: ["Großformat", "ruhig", "edel"], quote: "„Weniger Fugen, mehr Eleganz.“" },
  { src: b3, title: "Naturstein-Optik", tags: ["Optik", "Struktur", "warm"], quote: "„Natürlich im Look. Präzise in der Ausführung.“" },
  { src: b4, title: "Detaillösung – Anschluss", tags: ["Anschluss", "Silikon", "sauber"], quote: "„Die kleinen Übergänge entscheiden über den großen Eindruck.“" },
  { src: b5, title: "Boden – Strapazierfähig", tags: ["Boden", "Alltag", "robust"], quote: "„Für Alltag gebaut – nicht nur fürs Foto.“" },
  { src: b6, title: "Bad – Linienführung", tags: ["Bad", "Symmetrie", "klar"], quote: "„Klare Linien. Kein Lärm.“" },
  { src: b7, title: "Küche – Details", tags: ["Küche", "Schnitt", "passgenau"], quote: "„Passgenau heißt: nichts wirkt nachträglich.“" },
  { src: c1, title: "Boden – Formatmix", tags: ["Boden", "Rhythmus", "Design"], quote: "„Ein Muster, das den Raum führt – nicht überlädt.“" },
  { src: c2, title: "Bad – Wandflächen", tags: ["Bad", "Wand", "clean"], quote: "„Fläche ist Luxus, wenn sie perfekt sitzt.“" },
  { src: c3, title: "Boden – Übergänge", tags: ["Übergang", "Profil", "präzise"], quote: "„Übergänge ohne Reibung – optisch wie technisch.“" },
  { src: c4, title: "Küche – Akzentfläche", tags: ["Akzent", "Farbe", "Stil"], quote: "„Ein Akzent – exakt gesetzt.“" },
  { src: c5, title: "Bad – Finish", tags: ["Finish", "Fuge", "Detail"], quote: "„Das Finish ist kein Extra. Es ist der Standard.“" },
  { src: f1, title: "Boden – Finale Fläche", tags: ["Final", "Gerade", "stimmig"], quote: "„Am Ende zählt: alles wirkt wie aus einem Guss.“" },
]

/** Six collage picks per slide: full batch rotates. Excludes featured index. */
function collageForIndex(featuredIndex, projects, count = 6) {
  const n = projects.length
  const batchStart = (featuredIndex * count) % n
  const picks = []
  for (let step = 0; picks.length < count && step < n + count; step++) {
    const j = (batchStart + step) % n
    if (j === featuredIndex) continue
    picks.push(j)
  }
  return picks.map((j, i) => ({
    ...projects[j],
    _key: `${featuredIndex}-batch-${batchStart}-${j}-${i}`,
  }))
}

export default function GalleryShowcase({
  title = "Referenzen",
  description = "„Qualität zeigt sich in den Details.“",
}) {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const articleRef = useRef(null)
  const collageGridRef = useRef(null)
  const featuredImgRef = useRef(null)
  const featuredColRef = useRef(null)

  useSectionCrossFade(sectionRef, reducedMotion)

  const projects = useMemo(() => PROJECTS, [])
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [paused, setPaused] = useState(false)

  const current = projects[index]
  const n = projects.length
  const collage = useMemo(() => collageForIndex(index, projects), [index, projects])

  useEffect(() => {
    if (reducedMotion || paused) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, 5000)
    return () => window.clearInterval(id)
  }, [reducedMotion, n, paused])

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + n) % n)
    },
    [n]
  )

  /** ScrollTrigger once: card lifts in (intro text stays visible). */
  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !articleRef.current) return

    const articleEl = articleRef.current
    const ctx = gsap.context(() => {
      gsap.set(articleEl, { opacity: 0, y: 42 })
      gsap.to(articleEl, {
        opacity: 1,
        y: 0,
        duration: 0.92,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  /** Intro: heading letters + description words on scroll (once). */
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const root = sectionRef.current
    const ctx = gsap.context(() => {
      const chars = root.querySelectorAll("[data-gallery-heading-char]")
      if (chars.length) {
        gsap.from(chars, {
          scrollTrigger: { trigger: root, start: "top 82%", once: true },
          opacity: 0,
          y: (i) => (i % 2 === 0 ? -22 : 22),
          rotateZ: (i) => (i % 2 === 0 ? -14 : 14),
          stagger: 0.028,
          duration: 0.72,
          ease: "back.out(1.55)",
        })
      }

      const words = root.querySelectorAll("[data-gallery-desc-word]")
      if (words.length) {
        gsap.from(words, {
          scrollTrigger: { trigger: root, start: "top 78%", once: true },
          opacity: 0,
          y: 18,
          rotateX: -35,
          stagger: 0.045,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.12,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion, title, description])

  /** Slide change: featured media & copy + collage motion (transform-only on tiles so quotes stay independent). */
  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const featImg = featuredImgRef.current
      const featCol = featuredColRef.current
      const grid = collageGridRef.current

      if (featImg) {
        gsap.fromTo(
          featImg,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 0.68, ease: "power3.out" }
        )
      }

      if (featCol) {
        const labelChars = featCol.querySelectorAll("[data-feature-label-char]")
        if (labelChars.length) {
          gsap.fromTo(
            labelChars,
            { opacity: 0, y: 14, rotateX: -70 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.42,
              stagger: 0.035,
              ease: "power2.out",
            }
          )
        }

        const titleChars = featCol.querySelectorAll("[data-feature-title-char]")
        if (titleChars.length) {
          gsap.fromTo(
            titleChars,
            { opacity: 0, y: 28, rotateY: -52, transformOrigin: "50% 50% -12px" },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.52,
              stagger: 0.022,
              ease: "power3.out",
              delay: 0.06,
            }
          )
        }

        const divider = featCol.querySelector("[data-feature-divider]")
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.38,
              ease: "power2.out",
              transformOrigin: "left center",
              delay: 0.14,
            }
          )
        }

        const quoteWords = featCol.querySelectorAll("[data-quote-word]")
        if (quoteWords.length) {
          gsap.fromTo(
            quoteWords,
            { opacity: 0, y: 14, skewX: -6 },
            {
              opacity: 1,
              y: 0,
              skewX: 0,
              duration: 0.44,
              stagger: 0.032,
              ease: "power2.out",
              delay: 0.2,
            }
          )
        }

        const btnChars = featCol.querySelectorAll("[data-feature-btn-char]")
        if (btnChars.length) {
          gsap.fromTo(
            btnChars,
            { opacity: 0, y: 12, scale: 0.65 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.38,
              stagger: 0.018,
              ease: "back.out(1.8)",
              delay: 0.32,
            }
          )
        }

        const lineBlocks = featCol.querySelectorAll("[data-feature-line-block]")
        if (lineBlocks.length) {
          gsap.fromTo(
            lineBlocks,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.26,
            }
          )
        }
      }

      const collageLabelChars = sectionRef.current?.querySelectorAll("[data-collage-label-char]")
      if (collageLabelChars?.length) {
        gsap.fromTo(
          collageLabelChars,
          { opacity: 0, x: -10, rotateZ: -18 },
          {
            opacity: 1,
            x: 0,
            rotateZ: 0,
            duration: 0.36,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.04,
          }
        )
      }

      if (grid) {
        const cells = grid.querySelectorAll("[data-collage-cell]")
        gsap.fromTo(
          cells,
          { y: 18, scale: 0.9, rotate: -2 },
          {
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.55,
            stagger: { each: 0.055, from: "random" },
            ease: "back.out(1.25)",
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [index, reducedMotion, collage])

  /** Quote overlays + hover lift — attach after entrance stagger. */
  useEffect(() => {
    if (reducedMotion) return

    const cellCleanups = []
    let cancelled = false

    const tid = window.setTimeout(() => {
      if (cancelled) return
      const grid = collageGridRef.current
      if (!grid) return

      const cells = grid.querySelectorAll("[data-collage-cell]")
      cells.forEach((cell) => {
        const quoteEl = cell.querySelector("[data-collage-quote]")
        const imgEl = cell.querySelector("[data-collage-img]")
        if (!quoteEl) return

        gsap.set(quoteEl, { opacity: 0, y: 10 })
        if (imgEl) gsap.set(imgEl, { scale: 1 })

        const show = () => {
          gsap.to(cell, { scale: 1.045, duration: 0.38, ease: "power2.out" })
          if (imgEl) gsap.to(imgEl, { scale: 1.07, duration: 0.45, ease: "power2.out" })
          gsap.to(quoteEl, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" })
        }

        const hide = () => {
          gsap.to(cell, { scale: 1, duration: 0.32, ease: "power2.inOut" })
          if (imgEl) gsap.to(imgEl, { scale: 1, duration: 0.35, ease: "power2.inOut" })
          gsap.to(quoteEl, { opacity: 0, y: 10, duration: 0.28, ease: "power2.in" })
        }

        const onFocusOut = (ev) => {
          if (!cell.contains(ev.relatedTarget)) hide()
        }

        cell.addEventListener("mouseenter", show)
        cell.addEventListener("mouseleave", hide)
        cell.addEventListener("focusin", show)
        cell.addEventListener("focusout", onFocusOut)

        cellCleanups.push(() => {
          cell.removeEventListener("mouseenter", show)
          cell.removeEventListener("mouseleave", hide)
          cell.removeEventListener("focusin", show)
          cell.removeEventListener("focusout", onFocusOut)
        })
      })
    }, 560)

    return () => {
      cancelled = true
      window.clearTimeout(tid)
      cellCleanups.forEach((fn) => fn())
    }
  }, [index, reducedMotion, collage])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="mx-auto w-full min-w-0 content-shell py-10 md:py-11 reveal-group"
    >
      <div className="flex flex-col gap-4 md:gap-5">
        <div ref={introRef} className="w-full min-w-0 max-w-xl mx-auto text-center perspective-[880px] px-0">
          <h2 className="section-title mb-1 leading-tight">
            {reducedMotion
              ? title
              : title.split("").map((char, i) => (
                  <span key={`gallery-h-${i}`} className="inline-block" data-gallery-heading-char>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
          </h2>
          <p className="font-[var(--font-body)] text-[11px] md:text-xs text-[var(--color-slate)] leading-relaxed text-safe italic">
            {reducedMotion
              ? description
              : description.split(/\s+/).filter(Boolean).map((word, i) => (
                  <span key={`gallery-d-${i}`} className="inline-block mr-[0.22em]" data-gallery-desc-word>
                    {word}
                  </span>
                ))}
          </p>
        </div>

        <article
          ref={articleRef}
          className="mx-auto w-full min-w-0 max-w-full rounded-xl border border-black/10 bg-white shadow-[0_8px_28px_-16px_rgba(0,0,0,0.12)] overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
          }}
        >
          {!reducedMotion ? (
            <div className="h-0.5 bg-black/[0.06] overflow-hidden" aria-hidden>
              <div key={`bar-${index}`} className="h-full w-full origin-left gallery-autoplay-track bg-[var(--color-primary)]" />
            </div>
          ) : null}

          <div key={`feat-${index}`} className="p-3 md:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 lg:gap-4 lg:items-stretch">
              <div className="flex flex-col gap-2 min-w-0 lg:h-full lg:min-h-[280px]">
                <div className="relative w-full h-32 sm:h-36 shrink-0 lg:shrink lg:flex-1 lg:basis-0 lg:min-h-0 lg:h-auto rounded-lg overflow-hidden bg-[var(--color-dark)] border border-black/10">
                  <img
                    ref={featuredImgRef}
                    src={current.src}
                    alt={`Referenzfoto Plattenarbeit: ${current.title}`}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover object-center [image-rendering:auto]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-black/10 pointer-events-none" />
                </div>

                <div
                  ref={featuredColRef}
                  className="flex flex-col gap-1.5 text-left items-start rounded-lg border border-black/[0.07] bg-[var(--color-bg)]/50 px-3 py-2.5 min-h-0 lg:flex-1 lg:basis-0 lg:justify-center lg:overflow-y-auto perspective-[720px]"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)] flex flex-wrap gap-0">
                    {reducedMotion
                      ? "Schwerpunkte"
                      : "Schwerpunkte".split("").map((char, i) => (
                          <span key={`${index}-lb-${i}`} data-feature-label-char className="inline-block">
                            {char}
                          </span>
                        ))}
                  </p>
                  <h3 className="font-[var(--font-heading)] text-base md:text-lg text-[var(--color-dark)] tracking-tight leading-snug [transform-style:preserve-3d]">
                    {reducedMotion
                      ? current.title
                      : current.title.split("").map((char, i) => (
                          <span key={`${index}-tl-${i}`} data-feature-title-char className="inline-block">
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                  </h3>
                  <div
                    data-feature-divider
                    className="h-px w-8 rounded-full bg-[var(--color-primary)]/30"
                    aria-hidden
                  />
                  <p className="font-[var(--font-body)] text-[var(--color-slate)] text-xs leading-relaxed italic text-safe">
                    {reducedMotion
                      ? current.quote
                      : current.quote.split(/\s+/).filter(Boolean).map((word, i) => (
                          <span key={`${index}-qw-${i}`} data-quote-word className="inline-block mr-[0.28em]">
                            {word}
                          </span>
                        ))}
                  </p>
                  <div data-feature-line-block className="flex flex-wrap gap-1.5">
                    {current.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-1.5 py-0.5 rounded-full border border-black/10 bg-white text-[var(--color-slate)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        src: current.src,
                        alt: `Referenz gross: ${current.title}`,
                      })
                    }
                    className="mt-0.5 px-3 py-1.5 rounded-md font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white text-[11px] transition-colors hover:bg-[var(--color-primary)]/92 shadow-sm"
                  >
                    {reducedMotion
                      ? "Bild gross ansehen"
                      : "Bild gross ansehen".split("").map((char, i) => (
                          <span key={`${index}-btn-${i}`} data-feature-btn-char className="inline-block">
                            {char === " " ? "\u00A0" : char}
                          </span>
                        ))}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 min-w-0 lg:h-full lg:min-h-0">
                <div className="flex items-center justify-between gap-2 px-0.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[var(--color-slate)]/90 flex flex-wrap gap-0">
                    {reducedMotion
                      ? "Collage"
                      : "Collage".split("").map((char, i) => (
                          <span key={`${index}-cl-${i}`} data-collage-label-char className="inline-block">
                            {char}
                          </span>
                        ))}
                  </p>
                  {!reducedMotion && paused ? (
                    <span className="text-[9px] text-[var(--color-slate)] shrink-0">Pausiert</span>
                  ) : null}
                </div>
                <div
                  ref={collageGridRef}
                  key={`collage-${index}`}
                  className="grid grid-cols-3 gap-1 sm:gap-1.5 flex-1 min-h-0 auto-rows-fr content-start"
                >
                  {collage.map((p) => (
                    <button
                      key={p._key}
                      type="button"
                      data-collage-cell
                      onClick={() =>
                        setLightbox({
                          src: p.src,
                          alt: `Referenz gross: ${p.title}`,
                        })
                      }
                      className={[
                        "relative aspect-square min-h-0 w-full overflow-hidden rounded-md border border-black/10 bg-gray-200 shadow-sm",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/45 focus-visible:ring-offset-1 focus-visible:ring-offset-white",
                      ].join(" ")}
                      aria-label={`${p.title} vergrössern`}
                    >
                      <img
                        data-collage-img
                        src={p.src}
                        alt={`Kleinansicht Referenz: ${p.title}`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
                      />
                      <div
                        data-collage-quote
                        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/58 p-1.5 sm:p-2"
                      >
                        <p className="text-center text-[8px] sm:text-[9px] leading-snug text-white font-[var(--font-body)] italic">
                          {p.quote}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] px-3 py-1.5 md:px-4 md:py-2 bg-white">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Vorherige Referenz"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-[var(--color-bg)] text-base leading-none text-[var(--color-dark)] transition-colors hover:bg-white hover:shadow-sm active:scale-95"
                onClick={() => go(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Nächste Referenz"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-[var(--color-bg)] text-base leading-none text-[var(--color-dark)] transition-colors hover:bg-white hover:shadow-sm active:scale-95"
                onClick={() => go(1)}
              >
                ›
              </button>
            </div>
            <p className="text-[11px] text-[var(--color-slate)]" aria-live="polite">
              {index + 1} / {n}
            </p>
            <div className="flex flex-wrap justify-end gap-0.5 max-w-[min(100%,200px)]">
              {projects.map((p, i) => (
                <button
                  key={`dot-${p.src}`}
                  type="button"
                  aria-label={`Referenz ${i + 1}: ${p.title}`}
                  aria-current={i === index}
                  className={[
                    "h-1.5 rounded-full transition-colors duration-300",
                    i === index ? "w-5 bg-[var(--color-primary)]" : "w-1.5 bg-black/15 hover:bg-black/25",
                  ].join(" ")}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        </article>
      </div>

      {lightbox ? (
        <ImageLightbox
          imageSrc={lightbox.src}
          altText={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </section>
  )
}
