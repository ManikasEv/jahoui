import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"
import { content } from "../../data/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useReveal } from "../../hooks/useReveal"

function FaqRow({ item, index, reducedMotion }) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    return () => {
      if (panelRef.current) gsap.killTweensOf(panelRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (reducedMotion || !open) return
    const el = panelRef.current
    if (!el) return

    gsap.killTweensOf(el)
    gsap.set(el, { height: 0, opacity: 0 })
    gsap.to(el, {
      height: el.scrollHeight,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
      onComplete: () => {
        el.style.height = "auto"
      },
    })
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
    el.style.height = `${el.scrollHeight}px`
    void el.offsetHeight

    gsap.to(el, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => setOpen(false),
    })
  }, [open, reducedMotion])

  const headingId = `faq-h-${index}`
  const panelId = `faq-p-${index}`

  const panelStyle = reducedMotion
    ? undefined
    : open
      ? { overflow: "hidden" }
      : { height: 0, opacity: 0, overflow: "hidden" }

  return (
    <div data-reveal className="border-b border-black/[0.08]">
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="group flex w-full items-center gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:py-6"
      >
        <span className="min-w-0 flex-1 font-[var(--font-heading)] text-base font-semibold leading-snug text-[var(--color-dark)] transition-colors duration-200 group-hover:text-[var(--color-primary)] sm:text-lg">
          {item.q}
        </span>
        <span
          className={[
            "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
            open
              ? "rotate-45 border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
              : "border-black/15 text-[var(--color-dark)] group-hover:border-[var(--color-primary)]/50 group-hover:text-[var(--color-primary)]",
          ].join(" ")}
          aria-hidden
        >
          <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
          <span className="absolute h-3.5 w-[1.5px] rounded-full bg-current" />
        </span>
      </button>

      <div id={panelId} role="region" aria-labelledby={headingId} ref={panelRef} style={panelStyle}>
        {reducedMotion && !open ? null : (
          <p className="max-w-[62ch] pb-6 font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] sm:text-[0.9375rem] text-safe">
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
  const faq = content?.sections?.faq

  useReveal(sectionRef, { stagger: 0.07 })

  if (!faq?.items?.length) return null

  return (
    <section id="faq" ref={sectionRef} className="section-band py-16 sm:py-20 lg:py-24">
      <div className="content-shell">
        <div className="mx-auto max-w-3xl">
          <div data-reveal className="mb-10 text-center sm:mb-12">
            <span className="title-rule title-rule--center" aria-hidden />
            <h2 className="section-title mb-4">{faq.title}</h2>
            <p className="mx-auto max-w-xl font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] sm:text-base text-safe">
              {faq.subtitle}
            </p>
          </div>

          <div className="border-t border-black/[0.08]">
            {faq.items.map((item, i) => (
              <FaqRow key={item.q} item={item} index={i} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
