import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import HeroDesktop from "./HeroDesktop"
import HeroMobile from "./HeroMobile"
import { heroInteractive } from "../../animations/heroAnimation"
import { content } from "../../data/content"

export default function Hero() {
  const wrapRef = useRef(null)

  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const badgeRef = useRef(null)
  const rightCardRef = useRef(null)
  const ctaRefs = useRef([])

  useEffect(() => {
    let cleanup
    const ctx = gsap.context(() => {
      cleanup = heroInteractive({
        wrapEl: wrapRef.current,
        titleEl: titleRef.current,
        subtitleEl: subtitleRef.current,
        badgeEl: badgeRef.current,
        rightCardEl: rightCardRef.current,
        ctas: ctaRefs.current,
      })
    }, wrapRef)

    return () => {
      cleanup && cleanup()
      ctx.revert()
    }
  }, [])

  return (
    <section id="hero" ref={wrapRef} className="w-full relative">
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-10 pb-14 relative">
        <HeroDesktop
          data={content.hero}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          badgeRef={badgeRef}
          rightCardRef={rightCardRef}
          ctaRefs={ctaRefs}
        />
        <HeroMobile
          data={content.hero}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          badgeRef={badgeRef}
          ctaRefs={ctaRefs}
        />
      </div>
    </section>
  )
}
