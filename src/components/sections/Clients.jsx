import { useRef } from "react"
import { FiHome, FiLayers, FiPenTool, FiKey } from "react-icons/fi"
import { content } from "../../data/content"
import { useReveal } from "../../hooks/useReveal"

const ICONS = {
  home: FiHome,
  building: FiLayers,
  design: FiPenTool,
  property: FiKey,
}

export default function Clients() {
  const sectionRef = useRef(null)
  const clients = content.sections.clients

  useReveal(sectionRef)

  return (
    <section id="clients" ref={sectionRef} className="section-band py-16 sm:py-20 lg:py-24">
      <div className="content-shell">
        <div data-reveal className="mb-12 max-w-2xl lg:mb-14">
          <span className="title-rule" aria-hidden />
          <h2 className="section-title mb-4">{clients.title}</h2>
          <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--color-slate)] text-safe">
            {clients.text}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {clients.items.map((item) => {
            const Icon = ICONS[item.icon] || FiHome
            return (
              <div
                key={item.title}
                data-reveal
                className="group surface-card surface-card--hover relative overflow-hidden p-7"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  <Icon size={22} strokeWidth={2} aria-hidden />
                </div>

                <h3 className="mb-2.5 font-[var(--font-heading)] text-lg font-semibold text-[var(--color-dark)] text-safe">
                  {item.title}
                </h3>
                <p className="font-[var(--font-body)] text-sm leading-relaxed text-[var(--color-slate)] text-safe">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
