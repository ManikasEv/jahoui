import { FaWhatsapp } from "react-icons/fa"
import { content } from "../../data/content"

export default function Footer() {
  const phone = content.footer.whatsappPhone
  const msg = encodeURIComponent(content.footer.whatsappPrefill)
  const link = `https://wa.me/${phone}?text=${msg}`

  const quickLinks = (content?.nav?.links || []).filter((l) => l?.href && l?.label && l.label !== "Start")
  const contact = content?.sections?.contact?.info
  const telDigits = (contact?.phone || "").replace(/[^\d+]/g, "").replace("+", "")

  return (
    <footer className="border-t border-black/5 bg-[var(--color-bg)]">
      <div className="mx-auto w-full min-w-0 content-shell pt-12 sm:pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="text-lg font-bold tracking-tight text-[var(--color-dark)]">{content.brand}</div>
            <p className="mt-3 font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed max-w-md">
              „Präzise Ausführung, saubere Übergaben und Ergebnisse, die im Alltag bestehen — in Bad, Küche und Boden.“
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                aria-label={content.footer.whatsappLabel}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur hover:bg-white transition-colors shadow-sm"
              >
                <FaWhatsapp className="text-xl text-green-600" />
                <span className="font-semibold text-[var(--color-dark)]">{content.footer.whatsappLabel}</span>
              </a>

              {contact?.phone ? (
                <a
                  href={telDigits ? `tel:+${telDigits}` : undefined}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 bg-white/40 backdrop-blur hover:bg-white/70 transition-colors text-[var(--color-dark)] font-semibold"
                >
                  Anrufen
                </a>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm font-semibold text-[var(--color-dark)]">Schnellzugriff</div>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors font-semibold">
                  Startseite
                </a>
              </li>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/leistungen"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Leistungen &amp; Region
                </a>
              </li>
              <li>
                <a
                  href="/plattenleger-zuerich"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plattenleger Zürich
                </a>
              </li>
              <li>
                <a
                  href="/badrenovation-zuerich"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Bad Renovation Zürich
                </a>
              </li>
              <li>
                <a
                  href="/kueche-fliesen-zuerich"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Küchen Fliesen Zürich
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--color-dark)]/70">Region</div>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/plattenleger-luzern"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plattenleger Luzern
                </a>
              </li>
              <li>
                <a
                  href="/plattenleger-zug"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plattenleger Zug
                </a>
              </li>
              <li>
                <a
                  href="/plattenleger-winterthur"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plattenleger Winterthur
                </a>
              </li>
              <li>
                <a
                  href="/plattenleger-aargau"
                  className="font-[var(--font-body)] text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Plattenleger Aargau
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-sm font-semibold text-[var(--color-dark)]">Kontakt</div>
            <div className="mt-4 space-y-3 font-[var(--font-body)] text-[var(--color-slate)]">
              {contact?.phone ? (
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">Telefon</div>
                  <a
                    href={telDigits ? `tel:+${telDigits}` : undefined}
                    className="text-sm font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              ) : null}

              {contact?.email ? (
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">E-Mail</div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              ) : null}

              {contact?.address ? (
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm">Standort</div>
                  <div className="text-sm font-semibold text-[var(--color-dark)]">{contact.address}</div>
                </div>
              ) : null}

              <div className="pt-2">
                <div className="text-xs text-[var(--color-slate)]/80">
                  „Schnelle Rückmeldung. Klare Offerte. Saubere Umsetzung.“
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-[var(--font-body)] text-[var(--color-slate)] text-center md:text-left text-sm">
            © {new Date().getFullYear()} {content.brand}. {content.footer.copyright}
          </div>

          <div className="font-[var(--font-body)] text-[var(--color-slate)] text-sm">
            Powered by{" "}
            <a
              href="https://hextech-it.ch"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors"
            >
              hextech-it.ch
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
