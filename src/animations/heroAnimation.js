import { gsap } from "gsap"

/**
 * Professional hero entrance:
 * background image settles with a slow scale, badge fades down,
 * title words rise out of an overflow mask, subtitle + CTAs follow.
 */
export function heroEntrance(root) {
  if (!root || typeof window === "undefined") return () => {}

  const badge = root.querySelector("[data-hero-badge]")
  const words = root.querySelectorAll("[data-hero-word]")
  const sub = root.querySelector("[data-hero-sub]")
  const ctas = root.querySelectorAll("[data-hero-cta]")
  const bg = root.querySelector("[data-hero-bg]")

  const all = [badge, sub, bg, ...words, ...ctas].filter(Boolean)

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(all, { clearProps: "all", opacity: 1 })
    return () => {}
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

  if (badge) {
    tl.fromTo(badge, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
  }

  if (words.length) {
    tl.fromTo(
      words,
      { yPercent: 115 },
      { yPercent: 0, duration: 0.95, stagger: 0.055, ease: "power4.out" },
      0.12
    )
  }

  if (sub) {
    tl.fromTo(sub, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.5)
  }

  if (ctas.length) {
    tl.fromTo(
      ctas,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
      0.62
    )
  }

  if (bg) {
    tl.fromTo(
      bg,
      { scale: 1.08 },
      { scale: 1, duration: 1.6, ease: "power2.out" },
      0
    )
  }

  return () => tl.kill()
}
