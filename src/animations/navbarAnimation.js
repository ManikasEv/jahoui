import { gsap } from "gsap"

export function navbarAnimation({ nav, links, cta }) {
  const allChars = nav.querySelectorAll("[data-char]")
  
  gsap.set(allChars, { opacity: 0, y: -10 })

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
  
  // Animate all characters with stagger
  tl.to(allChars, { 
    opacity: 1, 
    y: 0, 
    duration: 0.4, 
    stagger: 0.015 
  })

  // Add hover animations to links
  links.forEach((link) => {
    if (!link) return

    const chars = link.querySelectorAll("[data-char]")
    
    const onEnter = () => {
      gsap.to(chars, {
        y: -3,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      })
    }

    const onLeave = () => {
      gsap.to(chars, {
        y: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out"
      })
    }

    link.addEventListener("mouseenter", onEnter)
    link.addEventListener("mouseleave", onLeave)
  })

  // Add hover animation to CTA button with particles
  if (cta) {
    const ctaChars = cta.querySelectorAll("[data-char]")
    const particles = cta.querySelectorAll("[data-particle]")
    
    const onEnter = () => {
      // Button scale and shadow
      gsap.to(cta.querySelector("button"), {
        scale: 1.05,
        boxShadow: "0 8px 20px rgba(177, 18, 38, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      })
      
      // Button text characters
      gsap.to(ctaChars, {
        y: -2,
        duration: 0.3,
        stagger: 0.015,
        ease: "power2.out"
      })

      // Animate particles popping out
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2
        const distance = 40 + Math.random() * 20
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        gsap.fromTo(particle, 
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
            rotation: 0
          },
          {
            x: x,
            y: y,
            opacity: 1,
            scale: 1,
            rotation: Math.random() * 360 - 180,
            duration: 0.6,
            delay: i * 0.05,
            ease: "back.out(2)"
          }
        )
      })
    }

    const onLeave = () => {
      // Reset button
      gsap.to(cta.querySelector("button"), {
        scale: 1,
        boxShadow: "0 0 0 rgba(177, 18, 38, 0)",
        duration: 0.3,
        ease: "power2.out"
      })
      
      // Reset characters
      gsap.to(ctaChars, {
        y: 0,
        duration: 0.3,
        stagger: 0.015,
        ease: "power2.out"
      })

      // Particles disappear
      gsap.to(particles, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      })
    }

    cta.addEventListener("mouseenter", onEnter)
    cta.addEventListener("mouseleave", onLeave)
  }

  return tl
}

export function mobileMenuAnimation({ panel, items, isOpen }) {
  if (!panel) return
  gsap.killTweensOf([panel, ...items])

  if (isOpen) {
    gsap.set(panel, { display: "block", height: "auto" })
    gsap.fromTo(
      panel, 
      { opacity: 0, height: 0 }, 
      { opacity: 1, height: "auto", duration: 0.25, ease: "power3.out" }
    )
    gsap.fromTo(
      items, 
      { y: 15, opacity: 0, rotateX: -15 }, 
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration: 0.35, 
        stagger: 0.06, 
        ease: "back.out(1.3)" 
      }
    )
  } else {
    gsap.to(items, { y: -8, opacity: 0, duration: 0.2 })
    gsap.to(panel, {
      opacity: 0,
      height: 0,
      duration: 0.25,
      ease: "power3.in",
      onComplete: () => gsap.set(panel, { display: "none" }),
    })
  }
}
