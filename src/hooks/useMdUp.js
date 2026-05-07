import { useSyncExternalStore } from "react"

/** Matches Tailwind `md:` (768px). SSR snapshot: desktop layout. */
export function useMdUp() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 768px)")
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true
  )
}
