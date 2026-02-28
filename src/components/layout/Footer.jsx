import { FaWhatsapp } from "react-icons/fa"
import { content } from "../../data/content"

export default function Footer() {
  const phone = content.footer.whatsappPhone
  const msg = encodeURIComponent(content.footer.whatsappPrefill)
  const link = `https://wa.me/${phone}?text=${msg}`

  return (
    <footer className="border-t border-black/5 bg-[var(--color-bg)]">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-body text-[var(--color-slate)] text-center md:text-left">
          © {new Date().getFullYear()} {content.brand}. {content.footer.copyright}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={content.footer.whatsappLabel}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-black/10 bg-white/60 backdrop-blur hover:bg-white transition-colors"
        >
          <FaWhatsapp className="text-xl text-green-600" />
          <span className="font-semibold text-[var(--color-dark)]">
            {content.footer.whatsappLabel}
          </span>
        </a>
      </div>
    </footer>
  )
}
