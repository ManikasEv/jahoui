import { useEffect, useRef, useState } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  } catch {
    return false
  }
}

/**
 * Sets `shown` true once the element enters the viewport (IntersectionObserver).
 * Respects prefers-reduced-motion via initial state and `change` events.
 */
export function useRevealOnScroll(options = {}) {
  const {
    rootMargin = "0px 0px -6% 0px",
    threshold = 0.1,
    once = true,
  } = options
  const ref = useRef(null)
  const [shown, setShown] = useState(prefersReducedMotion)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onMq = () => {
      if (mq.matches) setShown(true)
    }
    mq.addEventListener("change", onMq)

    if (prefersReducedMotion()) {
      return () => mq.removeEventListener("change", onMq)
    }

    const el = ref.current
    if (!el) {
      return () => mq.removeEventListener("change", onMq)
    }

    if (typeof IntersectionObserver === "undefined") {
      const id = window.requestAnimationFrame(() => setShown(true))
      return () => {
        window.cancelAnimationFrame(id)
        mq.removeEventListener("change", onMq)
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            if (once) obs.unobserve(e.target)
          }
        }
      },
      { rootMargin, threshold }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      mq.removeEventListener("change", onMq)
    }
  }, [rootMargin, threshold, once])

  return [ref, shown]
}
