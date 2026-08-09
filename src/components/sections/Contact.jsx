import { useRef, useState } from "react"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import { content } from "../../data/content"
import { useReveal } from "../../hooks/useReveal"

export default function Contact() {
  const sectionRef = useRef(null)
  const [result, setResult] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useReveal(sectionRef)

  const handleWhatsAppClick = () => {
    const phone = content.footer.whatsappPhone
    const message = encodeURIComponent(content.footer.whatsappPrefill)
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const info = content.sections.contact.info
  const phoneDigits = info.phone.replace(/\D/g, "")
  const phoneHref = phoneDigits ? `tel:+${phoneDigits.replace(/^\+?/, "")}` : ""

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setResult("")

    const formData = new FormData(event.target)
    formData.append("access_key", "9820c027-9975-44d9-a6cb-36a5b5fa711f")

    // Add custom subject and formatting
    formData.append("subject", "Neue Anfrage – Plattenleger Jaho GmbH (jaho-plattenleger.ch)")
    formData.append("from_name", "Plattenleger Jaho GmbH Website")
    formData.append("replyto", formData.get("email"))

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setResult("success")
        event.target.reset()

        // Hide success message after 5 seconds
        setTimeout(() => {
          setResult("")
        }, 5000)
      } else {
        setResult("error")
      }
    } catch {
      setResult("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactRows = [
    { icon: FiPhone, label: "Telefon", value: info.phone, href: phoneHref },
    { icon: FiMail, label: "E-Mail", value: info.email, href: `mailto:${info.email}` },
    { icon: FiMapPin, label: "Standort", value: info.address },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section-band py-16 sm:py-20 lg:py-24">
      <div className="content-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy + direct contact */}
          <div className="min-w-0 lg:col-span-5">
            <div data-reveal>
              <span className="title-rule" aria-hidden />
              <h2 className="section-title mb-4">{content.sections.contact.title}</h2>
              <p className="mb-10 max-w-md font-[var(--font-body)] text-base leading-relaxed text-[var(--color-slate)] text-safe">
                {content.sections.contact.text}
              </p>
            </div>

            <div className="space-y-2.5">
              {contactRows.map((row) => {
                const Icon = row.icon
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors duration-300 group-hover:bg-[var(--color-primary)] group-hover:text-white">
                      <Icon size={19} aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-slate)]/70">
                        {row.label}
                      </span>
                      <span className="block truncate font-[var(--font-body)] font-semibold text-[var(--color-dark)]">
                        {row.value}
                      </span>
                    </span>
                  </>
                )

                return row.href ? (
                  <a
                    key={row.label}
                    data-reveal
                    href={row.href}
                    className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors duration-200 hover:bg-white"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={row.label} data-reveal className="group flex items-center gap-4 rounded-2xl px-3 py-3">
                    {inner}
                  </div>
                )
              })}
            </div>

            <div data-reveal className="mt-8">
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="btn btn--whatsapp btn--lg w-full sm:w-auto"
              >
                <FaWhatsapp size={20} aria-hidden />
                {content.footer.whatsappLabel}
                <span className="ml-1 hidden font-normal text-[var(--color-whatsapp)]/80 sm:inline">
                  — Schnelle Antwort garantiert
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <div data-reveal className="min-w-0 lg:col-span-7">
            <div className="surface-card p-7 sm:p-10">
              <h3 className="mb-7 font-[var(--font-heading)] text-xl font-semibold text-[var(--color-dark)] sm:text-2xl">
                Nachricht senden
              </h3>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-[var(--font-body)] text-sm font-semibold text-[var(--color-dark)]">
                      Name
                    </label>
                    <input type="text" name="name" required className="input-field" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="mb-2 block font-[var(--font-body)] text-sm font-semibold text-[var(--color-dark)]">
                      E-Mail
                    </label>
                    <input type="email" name="email" required className="input-field" placeholder="ihre@email.com" />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-[var(--font-body)] text-sm font-semibold text-[var(--color-dark)]">
                    Nachricht
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="input-field resize-none"
                    placeholder="Beschreiben Sie Ihr Projekt..."
                  />
                </div>

                {result === "success" && (
                  <div
                    role="status"
                    className="rounded-xl border border-[rgba(var(--color-whatsapp-rgb),0.28)] bg-[rgba(var(--color-whatsapp-rgb),0.1)] p-4 text-center font-[var(--font-body)] text-sm font-semibold text-[var(--color-accent)]"
                  >
                    Nachricht erfolgreich gesendet!
                  </div>
                )}
                {result === "error" && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-center font-[var(--font-body)] text-sm font-semibold text-red-800"
                  >
                    Fehler beim Senden. Bitte versuchen Sie es erneut.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn--primary btn--lg w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
