import { gsap } from "gsap"

export function heroInteractive({ titleEl, subtitleEl, badgeEl, cta }) {
  if (!titleEl || typeof window === "undefined") return () => {}

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const letters = titleEl.querySelectorAll("[data-letter]")
    const subWords = subtitleEl?.querySelectorAll("[data-hero-subword]")
    gsap.set(letters, { opacity: 1, y: 0, rotateX: 0 })
    gsap.set(subWords || [], { opacity: 1, y: 0 })
    gsap.set([subtitleEl, badgeEl, cta].filter(Boolean), { opacity: 1, scale: 1 })
    return () => {}
  }

  const letters = titleEl.querySelectorAll("[data-letter]")
  const subWords = subtitleEl?.querySelectorAll("[data-hero-subword]")

  gsap.set(letters, { opacity: 0, y: 38, rotateX: -52 })
  if (subWords?.length) gsap.set(subWords, { opacity: 0, y: 16 })
  else if (subtitleEl) gsap.set(subtitleEl, { opacity: 0 })

  gsap.set([badgeEl, cta].filter(Boolean), { opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

  if (badgeEl) {
    tl.fromTo(
      badgeEl,
      { opacity: 0, y: -14, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.48 },
      0
    )
  }

  tl.to(
    letters,
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.58,
      stagger: { each: 0.016 },
      ease: "back.out(1.35)",
    },
    badgeEl ? 0.06 : 0
  )

  if (subWords?.length) {
    tl.to(
      subWords,
      {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.03,
        ease: "power2.out",
      },
      0.22
    )
  } else if (subtitleEl) {
    tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.5 }, 0.26)
  }

  if (cta) {
    tl.fromTo(
      cta,
      { opacity: 0, y: 22, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.52, ease: "back.out(1.4)" },
      0.36
    )
  }

  return () => tl.kill()
}
