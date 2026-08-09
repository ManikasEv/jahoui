import { useCallback, useEffect, useRef } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import heroBg from "../../assets/j7.jpg"
import { heroEntrance } from "../../animations/heroAnimation"
import { content } from "../../data/content"

export default function Hero() {
  const wrapRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const data = content.hero

  const goContact = useCallback(() => {
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: "contact" })
      return
    }
    navigate({ hash: "contact" })
  }, [location.pathname, navigate])

  useEffect(() => {
    const cleanup = heroEntrance(wrapRef.current)
    return cleanup
  }, [])

  return (
    <section
      id="hero"
      ref={wrapRef}
      className="relative flex w-full overflow-hidden"
    >
      {/* Background image + legibility overlays */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          data-hero-bg
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      </div>

      <div className="content-shell relative z-10 flex min-h-[88svh] w-full flex-1 flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20 lg:min-h-[92svh] lg:py-24">
        <div className="max-w-3xl">
          <div
            data-hero-badge
            className="mb-7 inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" aria-hidden />
            <span className="font-[var(--font-body)] text-xs font-semibold tracking-wide text-white/90 sm:text-sm text-safe">
              {data.badge}
            </span>
          </div>

          <h1 className="hero-title hero-title--light mb-6 max-w-full lg:max-w-[16ch] text-safe">
            {data.title.split(" ").map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom mr-[0.24em]"
              >
                <span data-hero-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mb-9 max-w-full font-[var(--font-body)] text-base leading-relaxed text-white/80 sm:text-lg lg:max-w-[52ch] text-safe"
          >
            {data.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button data-hero-cta type="button" onClick={goContact} className="btn btn--primary btn--lg">
              {data.cta}
            </button>
            <Link data-hero-cta to="/referenzen" className="btn btn--ghost btn--lg">
              Alle Referenzen ansehen
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
