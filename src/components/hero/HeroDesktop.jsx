import logoJaho from "../../assets/logojaho.jpg"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroDesktop({ data, titleRef, subtitleRef, badgeRef, ctaRef }) {
  const logoRef = useRef(null)

  useEffect(() => {
    const el = logoRef.current
    if (!el) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const tw = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.55, ease: "power2.out" })
    return () => tw.kill()
  }, [])

    return (
      <div className="hidden md:grid grid-cols-12 gap-12 items-center">
        <div className="col-span-7">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur font-semibold text-sm text-[var(--color-slate)] mb-6"
          >
            {data.badge}
          </div>
  
          <h1
            ref={titleRef}
            className="hero-title mb-6 max-w-[600px] perspective-[900px] [transform-style:preserve-3d]"
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
  
          <p
            ref={subtitleRef}
            className="font-[var(--font-body)] text-[var(--color-slate)] text-lg leading-relaxed mb-8 max-w-xl perspective-[760px]"
          >
            {data.subtitle.split(/\s+/).filter(Boolean).map((word, i) => (
              <span key={i} className="inline-block mr-[0.22em]" data-hero-subword>
                {word}
              </span>
            ))}
          </p>
  
          <button
            ref={ctaRef}
            type="button"
            onClick={() => (window.location.href = "/#contact")}
            className="px-8 py-4 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white text-lg transition-all duration-300 hover:bg-[var(--color-primary)]/92 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {data.cta}
          </button>
        </div>
  
        <div className="col-span-5">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-dark)] border border-black/10 shadow-xl">
          <div className="absolute inset-0 hero-logo-motion">
            <img
              src={logoJaho}
              alt="Logo Plattenleger Jaho GmbH"
              ref={logoRef}
              className="absolute inset-0 w-full h-full object-cover scale-[1.35] md:scale-[1.28]"
              loading="eager"
              decoding="async"
            />
          </div>
          </div>
        </div>
      </div>
    )
  }
