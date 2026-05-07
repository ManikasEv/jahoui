import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Smooth section entrance (crossfade-style autoAlpha + lift).
 * Skips when prefers-reduced-motion — leaves layout untouched.
 */
export function useSectionCrossFade(sectionRef, reducedMotion, options = {}) {
  const {
    y = 48,
    duration = 1,
    ease = "power2.inOut",
    start = "top bottom",
  } = options

  useEffect(() => {
    const el = sectionRef?.current
    if (!el) return

    if (reducedMotion) {
      gsap.set(el, { clearProps: "opacity,visibility,transform" })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [sectionRef, reducedMotion, y, duration, ease, start])
}

/**
 * Extra softness on primary headings (blur lift). Use where titles are plain text.
 * Avoid stacking with heavy per-letter GSAP on the same node.
 */
export function useSectionHeadingSoftReveal(sectionRef, reducedMotion, options = {}) {
  const {
    blur = 12,
    y = 20,
    duration = 0.85,
    ease = "power2.out",
    start = "top 88%",
    selector = ".section-heading-soft",
  } = options

  useEffect(() => {
    const root = sectionRef?.current
    if (!root || reducedMotion) return

    const ctx = gsap.context(() => {
      const headings = root.querySelectorAll(selector)
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { autoAlpha: 0.35, y, filter: `blur(${blur}px)` },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration,
            ease,
            scrollTrigger: {
              trigger: root,
              start,
              once: true,
            },
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [sectionRef, reducedMotion, blur, y, duration, ease, start, selector])
}
