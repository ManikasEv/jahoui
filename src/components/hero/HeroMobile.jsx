import logoJaho from "../../assets/logojaho.jpg"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroMobile({ data, titleRef, subtitleRef, badgeRef, ctaRef }) {
  const logoRef = useRef(null)

  useEffect(() => {
    const el = logoRef.current
    if (!el) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const tw = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
    return () => tw.kill()
  }, [])

    return (
      <div className="md:hidden w-full min-w-0 max-w-full">
        <div
          ref={badgeRef}
          className="inline-flex max-w-full items-center gap-2 px-3 py-2 sm:px-4 rounded-full border border-black/10 bg-white/70 backdrop-blur text-[var(--font-body)] text-xs font-semibold sm:text-sm text-[var(--color-slate)] mb-5 text-safe"
        >
          {data.badge}
        </div>

        <h1
          ref={titleRef}
          className="hero-title mb-4 max-w-full text-safe perspective-[900px] [transform-style:preserve-3d]"
        >
          {data.title.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-[0.18em]">
              {word.split("").map((ch, charIndex) => (
                <span key={charIndex} data-letter className="inline-block">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="font-[var(--font-body)] text-[var(--color-slate)] text-[0.9375rem] sm:text-base leading-relaxed mb-6 text-safe max-w-full perspective-[760px]">
          {data.subtitle.split(/\s+/).filter(Boolean).map((word, i) => (
            <span key={i} className="inline-block mr-[0.22em]" data-hero-subword>
              {word}
            </span>
          ))}
        </p>

      <div className="relative aspect-[4/3] w-full max-w-full rounded-2xl overflow-hidden bg-[var(--color-dark)] border border-black/10 shadow-lg mb-6">
        <div className="absolute inset-0 hero-logo-motion">
          <img
            src={logoJaho}
            alt="Logo Plattenleger Jaho GmbH"
            ref={logoRef}
            className="absolute inset-0 w-full h-full object-cover scale-110 sm:scale-[1.22]"
            loading="eager"
            decoding="async"
          />
        </div>
        </div>

        <button
          ref={ctaRef}
          type="button"
          onClick={() => (window.location.href = "/#contact")}
          className="w-full px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white transition-all duration-300 hover:bg-[var(--color-primary)]/92 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-lg"
        >
          {data.cta}
        </button>
      </div>
    )
  }
