import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"
import { content } from "../../data/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useSectionCrossFade } from "../../hooks/useSectionCrossFade"

gsap.registerPlugin(ScrollTrigger)

function FaqRow({ item, index, reducedMotion }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const chevronRef = useRef(null)

  useEffect(() => {
    return () => {
      if (panelRef.current) gsap.killTweensOf(panelRef.current)
      if (chevronRef.current) gsap.killTweensOf(chevronRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion || !open) return
    const el = panelRef.current
    if (!el) return

    gsap.killTweensOf(el)
    gsap.set(el, { height: 0, opacity: 0 })
    const h = el.scrollHeight
    gsap.to(el, {
      height: h,
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        el.style.height = "auto"
      },
    })

    if (chevronRef.current) {
      gsap.killTweensOf(chevronRef.current)
      gsap.to(chevronRef.current, { rotate: 180, duration: 0.35, ease: "power2.out" })
    }
  }, [open, reducedMotion])

  const toggle = useCallback(() => {
    const el = panelRef.current
    if (reducedMotion) {
      setOpen((o) => !o)
      return
    }
    if (!el) return

    if (!open) {
      setOpen(true)
      return
    }

    gsap.killTweensOf(el)
    const fixed = el.scrollHeight
    el.style.height = `${fixed}px`
    void el.offsetHeight

    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.32,
      ease: "power2.inOut",
      onComplete: () => setOpen(false),
    })

    if (chevronRef.current) {
      gsap.killTweensOf(chevronRef.current)
      gsap.to(chevronRef.current, { rotate: 0, duration: 0.28, ease: "power2.inOut" })
    }
  }, [open, reducedMotion])

  const headingId = `faq-h-${index}`
  const panelId = `faq-p-${index}`

  const panelStyle =
    reducedMotion
      ? undefined
      : open
        ? { overflow: "hidden" }
        : { height: 0, opacity: 0, overflow: "hidden" }

  return (
    <div
      data-faq-item
      className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.12)]"
    >
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="flex w-full items-start gap-3 text-left px-5 py-4 md:px-6 md:py-5 font-[var(--font-body)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-sm font-bold text-[var(--color-primary)]">
          {index + 1}
        </span>
        <span className="min-w-0 flex-1 pt-1 font-[var(--font-heading)] text-base md:text-lg leading-snug text-[var(--color-dark)] perspective-[520px]">
          {reducedMotion ? (
            item.q
          ) : (
            item.q.split("").map((char, ci) => (
              <span key={`${index}-qc-${ci}`} data-faq-q-char className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))
          )}
        </span>
        <span
          ref={chevronRef}
          className={[
            "mt-1 shrink-0 inline-block text-[var(--color-primary)] text-lg leading-none origin-center",
            reducedMotion ? "transition-transform duration-300 ease-out" : "",
          ].join(" ")}
          aria-hidden
          style={
            reducedMotion ? { transform: open ? "rotate(180deg)" : "rotate(0deg)" } : undefined
          }
        >
          ▾
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        ref={panelRef}
        className="px-5 md:px-6"
        style={panelStyle}
      >
        {reducedMotion && !open ? null : (
          <p className="pb-5 pl-11 md:pl-[3.25rem] font-[var(--font-body)] text-sm md:text-[0.9375rem] leading-relaxed text-[var(--color-slate)] text-safe border-t border-black/[0.06] pt-4">
            {item.a}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Faq() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  const faq = content?.sections?.faq

  useSectionCrossFade(sectionRef, reducedMotion)

  useEffect(() => {
    if (!sectionRef.current || reducedMotion || !faq?.items?.length) return

    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll("[data-char]")
      if (chars?.length) {
        gsap.from(chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          opacity: 0,
          y: (i) => (i % 2 === 0 ? -26 : 26),
          rotateZ: (i) => (i % 2 === 0 ? -14 : 14),
          scale: 0.65,
          stagger: 0.028,
          duration: 0.68,
          ease: "back.out(1.45)",
        })
      }

      const words = subtitleRef.current?.querySelectorAll("[data-word]")
      if (words?.length) {
        gsap.from(words, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          opacity: 0,
          y: 18,
          rotateX: -40,
          stagger: 0.024,
          duration: 0.52,
          ease: "power3.out",
          delay: 0.1,
        })
      }

      const items = sectionRef.current.querySelectorAll("[data-faq-item]")
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 48, scale: 0.94, rotateX: -10 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 76%",
              once: true,
            },
            y: 0,
            scale: 1,
            rotateX: 0,
            stagger: 0.09,
            duration: 0.68,
            ease: "power3.out",
            delay: 0.08,
          }
        )
      }

      const qChars = sectionRef.current.querySelectorAll("[data-faq-q-char]")
      if (qChars.length) {
        gsap.from(qChars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            once: true,
          },
          opacity: 0,
          y: 12,
          rotateZ: (i) => (i % 2 === 0 ? -6 : 6),
          stagger: 0.005,
          duration: 0.36,
          ease: "power2.out",
          delay: 0.22,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion, faq?.items?.length])

  if (!faq?.items?.length) return null

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="mx-auto w-full min-w-0 content-shell py-12 sm:py-14 reveal-group perspective-[1200px]"
    >
      <div className="max-w-3xl mx-auto">
        <h2 ref={titleRef} className="section-title mb-3 text-center [transform-style:preserve-3d]">
          {reducedMotion ? (
            faq.title
          ) : (
            faq.title.split("").map((char, i) => (
              <span key={i} className="inline-block" data-char>
                {char === " " ? "\u00A0" : char}
              </span>
            ))
          )}
        </h2>
        <p
          ref={subtitleRef}
          className="font-[var(--font-body)] text-base md:text-[0.9375rem] text-[var(--color-slate)] mb-10 max-w-2xl mx-auto text-center leading-relaxed text-safe perspective-[880px]"
        >
          {reducedMotion ? (
            faq.subtitle
          ) : (
            faq.subtitle.split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.2em]" data-word>
                {word}
              </span>
            ))
          )}
        </p>

        <div className="flex flex-col gap-3 md:gap-4">
          {faq.items.map((item, i) => (
            <FaqRow key={item.q} item={item} index={i} reducedMotion={reducedMotion} />
          ))}
        </div>

        <p className="mt-10 font-[var(--font-body)] text-sm md:text-[0.9375rem] text-[var(--color-slate)] leading-relaxed text-center text-safe border-t border-black/[0.06] pt-8">
          Passend dazu:{" "}
          <Link to="/leistungen" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Leistungen &amp; Region
          </Link>
          ,{" "}
          <Link to="/badrenovation-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Badezimmer Renovation Zürich
          </Link>
          ,{" "}
          <Link to="/kueche-fliesen-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Küchen Fliesen Zürich
          </Link>
          ,{" "}
          <a href="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Galerie
          </a>{" "}
          und{" "}
          <a href="/#contact" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Kontakt für Ihre Offerte
          </a>
          .
        </p>
      </div>
    </section>
  )
}
