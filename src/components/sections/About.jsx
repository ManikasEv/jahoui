import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import profilePhoto from "../../assets/profile.jpg"
import { content } from "../../data/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useSectionCrossFade } from "../../hooks/useSectionCrossFade"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const photoWrapRef = useRef(null)

  const about = content.sections.about

  useSectionCrossFade(sectionRef, reducedMotion)

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return

    const root = sectionRef.current
    const ctx = gsap.context(() => {
      const st = {
        trigger: root,
        start: "top 78%",
        once: true,
      }

      const titleChars = root.querySelectorAll("[data-about-title-char]")
      if (titleChars.length) {
        gsap.from(titleChars, {
          scrollTrigger: st,
          opacity: 0,
          y: (i) => (i % 2 === 0 ? -22 : 22),
          rotateZ: (i) => (i % 3 === 0 ? -10 : i % 3 === 1 ? 8 : 0),
          stagger: 0.012,
          duration: 0.38,
          ease: "back.out(1.35)",
        })
      }

      const bioWords = root.querySelectorAll("[data-about-word]")
      if (bioWords.length) {
        gsap.from(bioWords, {
          scrollTrigger: st,
          opacity: 0,
          y: 14,
          skewX: -4,
          stagger: 0.008,
          duration: 0.32,
          ease: "power2.out",
          delay: 0.05,
        })
      }

      const nameChars = root.querySelectorAll("[data-about-name-char]")
      if (nameChars.length) {
        gsap.from(nameChars, {
          scrollTrigger: st,
          opacity: 0,
          x: -12,
          stagger: 0.018,
          duration: 0.32,
          ease: "power2.out",
          delay: 0.18,
        })
      }

      const pw = photoWrapRef.current
      if (pw) {
        gsap.from(pw, {
          scrollTrigger: st,
          opacity: 0,
          scale: 0.88,
          rotate: -6,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.05,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="about" ref={sectionRef} className="mx-auto w-full max-w-[80vw] px-6 py-14 perspective-[1200px]">
      <h2 className="section-title mb-8 md:mb-10 text-center [transform-style:preserve-3d]">
        {reducedMotion ? (
          about.title
        ) : (
          about.title.split("").map((char, i) => (
            <span key={`ab-t-${i}`} data-about-title-char className="inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))
        )}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div ref={photoWrapRef} className="flex justify-center md:justify-start">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[var(--color-primary)] bg-gray-200 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:scale-[1.03]">
            <img
              src={profilePhoto}
              alt={`${about.name}, Plattenleger und Fliesenleger Schweiz`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {about.bio.map((paragraph, pi) => (
            <p key={pi} className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed">
              {reducedMotion ? (
                paragraph
              ) : (
                paragraph.split(/\s+/).filter(Boolean).map((word, wi) => (
                  <span key={`${pi}-w-${wi}`} data-about-word className="inline-block mr-[0.28em]">
                    {word}
                  </span>
                ))
              )}
            </p>
          ))}
          <p className="font-[var(--font-heading)] text-lg text-[var(--color-dark)] mt-6">
            {reducedMotion ? (
              about.name
            ) : (
              about.name.split("").map((char, i) => (
                <span key={`ab-n-${i}`} data-about-name-char className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
