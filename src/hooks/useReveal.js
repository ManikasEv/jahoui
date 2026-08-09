import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(ScrollTrigger)

/**
 * Unified scroll reveal for a section: every `[data-reveal]` descendant fades
 * and lifts in DOM order with a soft stagger. One trigger per section keeps
 * the motion language consistent across the whole site.
 */
export function useReveal(
  sectionRef,
  { start = "top 80%", y = 26, stagger = 0.09, duration = 0.9 } = {}
) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const root = sectionRef?.current
    if (!root) return

    const targets = root.querySelectorAll("[data-reveal]")
    if (!targets.length) return

    if (reducedMotion) {
      gsap.set(targets, { clearProps: "all" })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [sectionRef, reducedMotion, start, y, stagger, duration])
}

/**
 * Count-up for stat numbers: elements need `data-count-to` (number) and
 * optionally `data-count-suffix` ("+", "%"). Triggers once per section.
 */
export function useCountUp(sectionRef, { start = "top 78%", duration = 1.6 } = {}) {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const root = sectionRef?.current
    if (!root) return

    const nodes = root.querySelectorAll("[data-count-to]")
    if (!nodes.length) return

    const render = (node, value) => {
      const suffix = node.getAttribute("data-count-suffix") || ""
      node.textContent = `${Math.round(value)}${suffix}`
    }

    if (reducedMotion) {
      nodes.forEach((node) => render(node, Number(node.getAttribute("data-count-to")) || 0))
      return
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = Number(node.getAttribute("data-count-to")) || 0
        const state = { value: 0 }
        render(node, 0)
        gsap.to(state, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => render(node, state.value),
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [sectionRef, reducedMotion, start, duration])
}
