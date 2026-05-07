import { gsap } from "gsap"

export function heroInteractive({ titleEl, subtitleEl, badgeEl, cta }) {
  if (!titleEl) return () => {}

  const letters = titleEl.querySelectorAll("[data-letter]")

  gsap.set(letters, { opacity: 0 })
  gsap.set([subtitleEl, badgeEl, cta], { opacity: 0 })

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

  tl.to(badgeEl, { opacity: 1, duration: 0.4 })
    .to(letters, { opacity: 1, duration: 0.45, stagger: { each: 0.012 }, }, 0.05)
    .to(subtitleEl, { opacity: 1, duration: 0.4 }, 0.25)
    .to(cta, { opacity: 1, duration: 0.35 }, 0.38)

  return () => tl.kill()
}
