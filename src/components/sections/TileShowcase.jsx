import { useRef } from "react"
import { useReveal, useCountUp } from "../../hooks/useReveal"

const PRAISES = [
  "Perfekte Verarbeitung",
  "Saubere Fugen",
  "Präzise Arbeit",
  "Langlebige Qualität",
  "Höchste Standards",
  "Millimetergenau",
  "Termingerecht",
  "Professionell",
  "Zuverlässig",
  "Erfahren",
]

const STATS = [
  { to: 25, suffix: "+", label: "Jahre Erfahrung" },
  { to: 500, suffix: "+", label: "Projekte" },
  { to: 100, suffix: "%", label: "Engagement" },
]

const TILE_TITLE = "Qualität im Detail"
const TILE_BODY =
  "Präzise Verlegung, saubere Übergänge und Arbeit, die im Alltag überzeugt — ohne Schnickschnack."

export default function TileShowcase() {
  const sectionRef = useRef(null)
  const row = [...PRAISES, ...PRAISES]

  useReveal(sectionRef)
  useCountUp(sectionRef)

  return (
    <section ref={sectionRef} className="section-band py-16 sm:py-20">
      <div className="content-shell">
        <div data-reveal className="mx-auto mb-10 max-w-xl text-center">
          <span className="title-rule title-rule--center" aria-hidden />
          <h2 className="section-title mb-3">{TILE_TITLE}</h2>
          <p className="font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] sm:text-base text-safe">
            {TILE_BODY}
          </p>
        </div>

        <div data-reveal className="ticker mb-12 border-y border-black/[0.07] py-4">
          <div className="ticker__track" aria-hidden="true">
            {row.map((text, i) => (
              <span
                key={`${text}-${i}`}
                className="inline-flex shrink-0 items-center font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate)]/80"
              >
                {text}
                <span className="mx-6 inline-block h-1 w-1 rounded-full bg-[var(--color-primary)]/60" />
              </span>
            ))}
          </div>
          <span className="sr-only">{PRAISES.join(", ")}</span>
        </div>

        <div data-reveal className="mx-auto grid max-w-3xl grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                "px-3 text-center sm:px-6",
                i > 0 ? "border-l border-black/[0.08]" : "",
              ].join(" ")}
            >
              <div className="font-[var(--font-heading)] text-3xl font-bold tabular-nums text-[var(--color-dark)] sm:text-4xl lg:text-[2.75rem]">
                <span data-count-to={s.to} data-count-suffix={s.suffix}>
                  {`${s.to}${s.suffix}`}
                </span>
              </div>
              <div className="mt-1.5 font-[var(--font-body)] text-xs font-medium text-[var(--color-slate)] sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
