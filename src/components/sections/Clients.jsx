import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"

gsap.registerPlugin(ScrollTrigger)

function getIcon(icon) {
  const icons = {
    home: "🏠",
    building: "🏗️",
    design: "📐",
    property: "🏢",
  }
  return icons[icon] || "✨"
}

export default function Clients() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const clients = content.sections.clients

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return

    const root = sectionRef.current
    const ctx = gsap.context(() => {
      const st = {
        trigger: root,
        start: "top 78%",
        once: true,
      }

      const titleChars = root.querySelectorAll("[data-clients-title-char]")
      if (titleChars.length) {
        gsap.from(titleChars, {
          scrollTrigger: st,
          opacity: 0,
          y: 26,
          rotateY: -42,
          transformOrigin: "50% 50% -14px",
          stagger: 0.024,
          duration: 0.58,
          ease: "power3.out",
        })
      }

      const introWords = root.querySelectorAll("[data-clients-intro-word]")
      if (introWords.length) {
        gsap.from(introWords, {
          scrollTrigger: st,
          opacity: 0,
          y: 16,
          rotateX: -35,
          stagger: 0.035,
          duration: 0.48,
          ease: "power2.out",
          delay: 0.12,
        })
      }

      const cards = root.querySelectorAll("[data-client-card]")
      if (cards.length) {
        gsap.from(cards, {
          scrollTrigger: st,
          opacity: 0,
          y: 40,
          rotateX: -12,
          transformOrigin: "50% 0%",
          stagger: 0.11,
          duration: 0.62,
          ease: "power3.out",
          delay: 0.18,
          immediateRender: false,
        })
      }

      const cardTitles = root.querySelectorAll("[data-client-card-title]")
      const cardBodies = root.querySelectorAll("[data-client-card-body]")
      if (cardTitles.length) {
        gsap.from(cardTitles, {
          scrollTrigger: st,
          opacity: 0,
          x: -14,
          stagger: 0.09,
          duration: 0.45,
          ease: "power2.out",
          delay: 0.42,
        })
      }
      if (cardBodies.length) {
        gsap.from(cardBodies, {
          scrollTrigger: st,
          opacity: 0,
          x: 12,
          stagger: 0.09,
          duration: 0.42,
          ease: "power2.out",
          delay: 0.48,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="clients" ref={sectionRef} className="mx-auto w-full max-w-[80vw] px-6 py-14 perspective-[1100px]">
      <h2 className="section-title mb-3 text-center [transform-style:preserve-3d]">
        {reducedMotion ? (
          clients.title
        ) : (
          clients.title.split("").map((char, i) => (
            <span key={`cl-t-${i}`} data-clients-title-char className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))
        )}
      </h2>
      <p className="font-[var(--font-body)] text-base md:text-[0.9375rem] text-[var(--color-slate)] mb-10 max-w-xl mx-auto text-center leading-relaxed text-safe perspective-[880px]">
        {reducedMotion ? (
          clients.text
        ) : (
          clients.text.split(/\s+/).filter(Boolean).map((word, i) => (
            <span key={`cl-i-${i}`} data-clients-intro-word className="inline-block mr-[0.22em]">
              {word}
            </span>
          ))
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {clients.items.map((item, index) => (
          <div
            key={index}
            data-client-card
            className="group rounded-2xl border border-black/10 bg-white px-6 py-5 shadow-sm hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 [transform-style:preserve-3d]"
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                aria-hidden
              >
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0">
                <h3
                  data-client-card-title
                  className="font-[var(--font-heading)] text-lg text-[var(--color-dark)] mb-1"
                >
                  {item.title}
                </h3>
                <p
                  data-client-card-body
                  className="font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed text-safe"
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
