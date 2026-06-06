import { useEffect, useRef, useState } from "react"

/** Returns true when navbar should show (top of page or scrolling up). */
export function useScrollDirection({ threshold = 10, topOffset = 64 } = {}) {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY || 0

    const onScroll = () => {
      const y = window.scrollY || 0
      setScrolled(y > 8)

      if (y <= topOffset) {
        setVisible(true)
      } else if (y > lastY.current + threshold) {
        setVisible(false)
      } else if (y < lastY.current - threshold) {
        setVisible(true)
      }

      lastY.current = y
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold, topOffset])

  return { visible, scrolled }
}
