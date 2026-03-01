import { gsap } from "gsap"

function magnetic(el, strength = 10) {
  if (!el) return () => {}

  gsap.set(el, { willChange: "transform" })

  const setX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" })
  const setY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" })
  const setS = gsap.quickTo(el, "scale", { duration: 0.25, ease: "power3.out" })

  const onMove = (e) => {
    const r = el.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    setX((dx / (r.width / 2)) * strength)
    setY((dy / (r.height / 2)) * strength)
    setS(1.03)
  }

  const onLeave = () => {
    setX(0)
    setY(0)
    setS(1)
  }

  el.addEventListener("mousemove", onMove)
  el.addEventListener("mouseleave", onLeave)

  return () => {
    el.removeEventListener("mousemove", onMove)
    el.removeEventListener("mouseleave", onLeave)
  }
}

function tiltCard(card, max = 8) {
  if (!card) return () => {}

  gsap.set(card, { transformStyle: "preserve-3d", willChange: "transform" })

  const rx = gsap.quickTo(card, "rotationX", { duration: 0.3, ease: "power3.out" })
  const ry = gsap.quickTo(card, "rotationY", { duration: 0.3, ease: "power3.out" })
  const tz = gsap.quickTo(card, "z", { duration: 0.3, ease: "power3.out" })

  const onMove = (e) => {
    const r = card.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotY = (px - 0.5) * max * 2
    const rotX = -(py - 0.5) * max * 2
    ry(rotY)
    rx(rotX)
    tz(15)
  }

  const onLeave = () => {
    ry(0)
    rx(0)
    tz(0)
  }

  card.addEventListener("mousemove", onMove)
  card.addEventListener("mouseleave", onLeave)

  return () => {
    card.removeEventListener("mousemove", onMove)
    card.removeEventListener("mouseleave", onLeave)
  }
}

export function heroInteractive({
  wrapEl,
  titleEl,
  subtitleEl,
  badgeEl,
  cta,
}) {
  if (!wrapEl || !titleEl) return

  const letters = titleEl.querySelectorAll("[data-letter]")

  // NO DROP - only fade in
  gsap.set(letters, { 
    opacity: 0,
    scale: 1
  })
  gsap.set([subtitleEl, badgeEl, cta], { 
    opacity: 0,
    scale: 1
  })

  // Clean timeline - NO drops, only fades
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
  
  // Animate badge first
  tl.to(badgeEl, {
    opacity: 1,
    duration: 0.5,
  })
  
  // Then letters with stagger
  .to(letters, {
    opacity: 1,
    duration: 0.6,
    stagger: 0.015,
  }, 0.1)
  
  // Subtitle fades in
  .to(subtitleEl, { 
    opacity: 1,
    duration: 0.5 
  }, 0.4)
  
  // CTA fades in
  .to(cta, { 
    opacity: 1,
    duration: 0.4, 
  }, 0.6)

  // Interactions
  const cleanups = []
  
  if (cta) {
    cleanups.push(magnetic(cta, 10))
  }

  return () => {
    cleanups.forEach((fn) => fn && fn())
  }
}
