import { gsap } from "gsap"

export function navbarAnimation({ nav }) {
  if (!nav) return
  gsap.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" })
}

export function mobileMenuAnimation({ panel, items, isOpen }) {
  if (!panel) return
  gsap.killTweensOf([panel, ...items])

  if (isOpen) {
    gsap.set(panel, { display: "block" })
    gsap.fromTo(
      panel,
      { opacity: 0, height: 0 },
      { opacity: 1, height: "auto", duration: 0.22, ease: "power2.out" }
    )
    gsap.fromTo(
      items,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.2, stagger: 0.04, ease: "power2.out" }
    )
  } else {
    gsap.to(items, { opacity: 0, duration: 0.12 })
    gsap.to(panel, {
      opacity: 0,
      height: 0,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => gsap.set(panel, { display: "none" }),
    })
  }
}
