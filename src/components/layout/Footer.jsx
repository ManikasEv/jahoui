import { FaWhatsapp } from "react-icons/fa"
import { FiPhone } from "react-icons/fi"
import { content } from "../../data/content"
import logoJaho from "../../assets/logojaho.jpg"

export default function Footer() {
  const phone = content.footer.whatsappPhone
  const msg = encodeURIComponent(content.footer.whatsappPrefill)
  const link = `https://wa.me/${phone}?text=${msg}`

  const quickLinks = (content?.nav?.links || []).filter((l) => l?.href && l?.label && l.label !== "Start")
  const contact = content?.sections?.contact?.info
  const telDigits = (contact?.phone || "").replace(/[^\d+]/g, "").replace("+", "")

  return (
    <footer className="bg-[var(--color-dark)] text-white/70">
      <div className="content-shell pt-14 pb-10 sm:pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="/" className="inline-flex items-center" aria-label={content.brand}>
              <span className="relative h-11 w-[12.5rem] shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
                <img
                  src={logoJaho}
                  alt=""
                  className="absolute left-1/2 top-1/2 h-[195%] w-auto max-w-none -translate-x-1/2 -translate-y-[48%]"
                  aria-hidden
                />
              </span>
            </a>

            <p className="mt-5 max-w-md font-[var(--font-body)] text-sm leading-relaxed text-white/60">
              „Wir übernehmen jeden Auftrag im Fliesenbereich — Pool, Bad, Küche, Schlafzimmer, Gehwege, Pflaster und mehr.“
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={content.footer.whatsappLabel}
                className="btn btn--md border border-white/15 bg-white/5 text-white hover:border-[rgba(var(--color-whatsapp-rgb),0.65)] hover:bg-white/10"
              >
                <FaWhatsapp size={17} className="text-[var(--color-whatsapp)]" aria-hidden />
                {content.footer.whatsappLabel}
              </a>

              {contact?.phone ? (
                <a
                  href={telDigits ? `tel:+${telDigits}` : undefined}
                  className="btn btn--md border border-white/15 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                >
                  <FiPhone size={16} aria-hidden />
                  Anrufen
                </a>
              ) : null}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <div className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Navigation
            </div>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="/"
                  className="font-[var(--font-body)] text-sm text-white/70 transition-colors hover:text-white"
                >
                  Startseite
                </a>
              </li>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-[var(--font-body)] text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-4">
            <div className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Kontakt
            </div>
            <div className="mt-5 space-y-3 font-[var(--font-body)] text-sm">
              {contact?.phone ? (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/50">Telefon</span>
                  <a
                    href={telDigits ? `tel:+${telDigits}` : undefined}
                    className="font-semibold text-white transition-colors hover:text-[var(--color-whatsapp)]"
                  >
                    {contact.phone}
                  </a>
                </div>
              ) : null}

              {contact?.email ? (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/50">E-Mail</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-semibold text-white transition-colors hover:text-[var(--color-whatsapp)]"
                  >
                    {contact.email}
                  </a>
                </div>
              ) : null}

              {contact?.address ? (
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/50">Standort</span>
                  <span className="text-right font-semibold text-white">{contact.address}</span>
                </div>
              ) : null}

              <p className="pt-3 text-xs text-white/40">
                „Schnelle Rückmeldung. Klare Offerte. Saubere Umsetzung.“
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <div className="text-center font-[var(--font-body)] text-xs text-white/45 md:text-left">
            © {new Date().getFullYear()} {content.brand}. {content.footer.copyright}
          </div>

          <div className="font-[var(--font-body)] text-xs text-white/45">
            Powered by{" "}
            <a
              href="https://hextech-it.ch"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white/70 transition-colors hover:text-white"
            >
              hextech-it.ch
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
