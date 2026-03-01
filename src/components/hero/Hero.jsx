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
  const ctaRef = useRef(null)

  useEffect(() => {
    let cleanup
    const ctx = gsap.context(() => {
      cleanup = heroInteractive({
        wrapEl: wrapRef.current,
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
  }, [])

  return (
    <section id="hero" ref={wrapRef} className="w-full relative">
      <div className="mx-auto w-full max-w-[1100px] px-6 pt-10 pb-14 relative">
        <HeroDesktop
          data={content.hero}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          badgeRef={badgeRef}
          ctaRef={ctaRef}
        />
        <HeroMobile
          data={content.hero}
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          badgeRef={badgeRef}
          ctaRef={ctaRef}
        />
      </div>
    </section>
  )
}
