import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import HeroDesktop from "./HeroDesktop"
import HeroMobile from "./HeroMobile"
import { heroInteractive } from "../../animations/heroAnimation"
import { content } from "../../data/content"
import { useMdUp } from "../../hooks/useMdUp"

export default function Hero() {
  const wrapRef = useRef(null)
  const isMdUp = useMdUp()

  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    let cleanup
    const ctx = gsap.context(() => {
      cleanup = heroInteractive({
        titleEl: titleRef.current,
        subtitleEl: subtitleRef.current,
        badgeEl: badgeRef.current,
        cta: ctaRef.current,
      })
    }, wrapRef)

    return () => {
      cleanup && cleanup()
      ctx.revert()
    }
  }, [isMdUp])

  return (
    <section id="hero" ref={wrapRef} className="w-full relative min-h-[100svh] flex">
      <div className="mx-auto w-full max-w-[80vw] px-6 py-14 md:py-18 relative flex items-center min-h-[100svh]">
        {isMdUp ? (
          <HeroDesktop
            data={content.hero}
            titleRef={titleRef}
            subtitleRef={subtitleRef}
            badgeRef={badgeRef}
            ctaRef={ctaRef}
          />
        ) : (
          <HeroMobile
            data={content.hero}
            titleRef={titleRef}
            subtitleRef={subtitleRef}
            badgeRef={badgeRef}
            ctaRef={ctaRef}
          />
        )}
      </div>
    </section>
  )
}
