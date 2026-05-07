import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion"
import { useSectionCrossFade, useSectionHeadingSoftReveal } from "../../hooks/useSectionCrossFade"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const reducedMotion = usePrefersReducedMotion()
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const [result, setResult] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useSectionCrossFade(sectionRef, reducedMotion)
  useSectionHeadingSoftReveal(sectionRef, reducedMotion)

  useEffect(() => {
    if (!sectionRef.current) return

    if (reducedMotion) {
      const titleChars = titleRef.current?.querySelectorAll("[data-char]")
      const words = textRef.current?.querySelectorAll("[data-word]")
      const formBits = formRef.current?.querySelectorAll("[data-contact-anim]")
      const infoBits = infoRef.current?.querySelectorAll("[data-contact-anim]")
      gsap.set(titleChars || [], { opacity: 1, y: 0, rotateZ: 0 })
      gsap.set(words || [], { opacity: 1, y: 0 })
      gsap.set([formRef.current, infoRef.current].filter(Boolean), { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 })
      gsap.set([...(formBits || []), ...(infoBits || [])], { opacity: 1, x: 0, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }

      const titleChars = titleRef.current.querySelectorAll("[data-char]")
      gsap.from(titleChars, {
        scrollTrigger: st,
        opacity: 0,
        y: (i) => (i % 2 === 0 ? -48 : 48),
        rotateZ: (i) => (i % 2 === 0 ? -18 : 18),
        stagger: 0.038,
        duration: 0.75,
        ease: "back.out(1.55)",
      })

      const words = textRef.current.querySelectorAll("[data-word]")
      gsap.from(words, {
        scrollTrigger: st,
        opacity: 0,
        y: (i) => Math.sin(i * 0.55) * 24,
        rotateX: -28,
        stagger: 0.028,
        duration: 0.58,
        ease: "power3.out",
        delay: 0.1,
      })

      gsap.from(formRef.current, {
        scrollTrigger: st,
        opacity: 0,
        x: -90,
        rotateY: -34,
        duration: 0.82,
        ease: "power3.out",
        delay: 0.08,
      })

      gsap.from(infoRef.current, {
        scrollTrigger: st,
        opacity: 0,
        x: 90,
        rotateY: 34,
        duration: 0.82,
        delay: 0.18,
        ease: "power3.out",
      })

      const formPieces = formRef.current?.querySelectorAll("[data-contact-anim]")
      if (formPieces?.length) {
        gsap.from(formPieces, {
          scrollTrigger: st,
          opacity: 0,
          y: 26,
          stagger: 0.07,
          duration: 0.48,
          ease: "power2.out",
          delay: 0.28,
        })
      }

      const infoPieces = infoRef.current?.querySelectorAll("[data-contact-anim]")
      if (infoPieces?.length) {
        gsap.from(infoPieces, {
          scrollTrigger: st,
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.46,
          ease: "power2.out",
          delay: 0.34,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  const handleWhatsAppClick = () => {
    const phone = content.footer.whatsappPhone
    const message = encodeURIComponent(content.footer.whatsappPrefill)
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  const phoneDigits = content.sections.contact.info.phone.replace(/\D/g, "")
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
        body: formData
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
    } catch (error) {
      setResult("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="mx-auto w-full max-w-[80vw] px-6 py-20 perspective-[1100px]"
    >
      <h2 ref={titleRef} className="section-title mb-4 [transform-style:preserve-3d]">
        {content.sections.contact.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p ref={textRef} className="font-[var(--font-body)] text-lg text-[var(--color-slate)] mb-12 max-w-2xl perspective-[760px]">
        {content.sections.contact.text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.18em]" data-word>
            {word}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div
          ref={formRef}
          className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-8"
        >
          <h3 className="section-heading-soft font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-6">
            Nachricht senden
          </h3>
          <form onSubmit={onSubmit} className="space-y-4">
            <div data-contact-anim>
              <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                placeholder="Ihr Name"
              />
            </div>
            <div data-contact-anim>
              <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                placeholder="ihre@email.com"
              />
            </div>
            <div data-contact-anim>
              <label className="block text-sm font-semibold text-[var(--color-dark)] mb-2">
                Nachricht
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 resize-none"
                placeholder="Beschreiben Sie Ihr Projekt..."
              />
            </div>
            
            {/* Success/Error Messages */}
            {result === "success" && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 font-semibold text-center animate-pulse">
                ✅ Nachricht erfolgreich gesendet!
              </div>
            )}
            {result === "error" && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 font-semibold text-center">
                ❌ Fehler beim Senden. Bitte versuchen Sie es erneut.
              </div>
            )}
            
            <button
              data-contact-anim
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white overflow-visible disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 rounded-xl overflow-hidden">
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </span>
              
              {/* Particle dots */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
              <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: "0.1s" }} />
              
              {/* Email icon - appears on hover, flies away on click */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 group-active:translate-x-[200px] group-active:-translate-y-[100px] group-active:opacity-0 group-active:scale-150 group-active:rotate-45">
                ✉️
              </span>
              
              <span className="relative z-10 group-hover:translate-x-3 transition-transform duration-300">
                {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
              </span>
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div ref={infoRef} className="space-y-6">
          <div data-contact-anim className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-8">
            <h3 className="font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-6">
              Kontaktinformationen
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-dark)]">Telefon</div>
                  <a
                    href={phoneHref}
                    className="text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {content.sections.contact.info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-dark)]">E-Mail</div>
                  <a
                    href={`mailto:${content.sections.contact.info.email}`}
                    className="text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {content.sections.contact.info.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-dark)]">Standort</div>
                  <div className="text-[var(--color-slate)]">
                    {content.sections.contact.info.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            data-contact-anim
            type="button"
            onClick={handleWhatsAppClick}
            className="group relative w-full rounded-2xl border-2 border-green-500/30 bg-green-50 p-6 hover:bg-green-100 transition-colors overflow-hidden"
          >
            <span className="absolute inset-0 bg-green-500/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-2xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="text-left">
                <div className="font-[var(--font-heading)] text-xl text-green-900 mb-1 flex items-center gap-2">
                  WhatsApp
                  <span className="inline-block transition-all group-hover:rotate-12 group-hover:scale-125">📱</span>
                </div>
                <div className="text-green-700 text-sm">
                  Schnelle Antwort garantiert
                </div>
              </div>
              <div className="text-4xl group-hover:scale-110 transition-transform">
                💬
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
