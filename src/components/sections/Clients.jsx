import { content } from "../../data/content"
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll"

function getIcon(icon) {
  const icons = {
    home: "🏠",
    building: "🏗️",
    design: "📐",
    property: "🏢",
  }
  return icons[icon] || "✨"
}

export default function Clients() {
  const [ref, shown] = useRevealOnScroll()

  return (
    <section
      id="clients"
      ref={ref}
      className={[
        "mx-auto w-full max-w-[80vw] px-6 py-14 reveal-group",
        shown ? "is-visible" : "",
      ].join(" ")}
    >
      <h2
        className="reveal-from-y section-title mb-3 text-center"
        style={{ ["--reveal-delay"]: 0 }}
      >
        {content.sections.clients.title}
      </h2>
      <p
        className="reveal-from-y font-[var(--font-body)] text-base md:text-[0.9375rem] text-[var(--color-slate)] mb-10 max-w-xl mx-auto text-center leading-relaxed text-safe"
        style={{ ["--reveal-delay"]: 70 }}
      >
        {content.sections.clients.text}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {content.sections.clients.items.map((item, index) => (
          <div
            key={index}
            className="group reveal-from-y rounded-2xl border border-black/10 bg-white px-6 py-5 shadow-sm hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5"
            style={{ ["--reveal-delay"]: 130 + index * 75 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-primary)]/10 text-xl transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                {getIcon(item.icon)}
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-dark)] mb-1">
                  {item.title}
                </h3>
                <p className="font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed text-safe">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
