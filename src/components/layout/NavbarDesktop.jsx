import { content } from "../../data/content"

const MARQUEE_TEXT =
  "Bad • Küche • Boden — Schweiz   •   Platten & Fliesen — sauber. präzise. langlebig.   •   Zürich & Umgebung — Offerte auf Anfrage"

export default function NavbarDesktop({ links, onCtaClick, linkRefs, ctaRef, onNavLinkClick, isScrolled }) {
  return (
    <div className="hidden lg:flex items-center justify-between gap-6 w-full">
      <div className="min-w-0 w-[min(360px,40vw)] max-w-[360px]">
        <div className="font-[var(--font-heading)] text-xl text-[var(--color-dark)] font-bold tracking-tight">
          {content.brand}
        </div>
        <div
          className={[
            "mt-1 marquee",
            isScrolled ? "text-[var(--color-slate)]/88" : "text-[var(--color-slate)]/74",
          ].join(" ")}
          aria-label={`„${MARQUEE_TEXT}“`}
        >
          <div className="marquee__track" aria-hidden="true">
            <span className="marquee__content">„{MARQUEE_TEXT}“</span>
            <span className="marquee__content">„{MARQUEE_TEXT}“</span>
          </div>
          <span className="sr-only">„{MARQUEE_TEXT}“</span>
        </div>
      </div>

      <div className="flex items-center gap-6 xl:gap-8 shrink-0">
        {links.map((link, i) => (
          <a
            key={`${link.href}-${link.label}`}
            ref={(el) => (linkRefs.current[i] = el)}
            href={link.href}
            onClick={(e) => onNavLinkClick?.(e, link.href)}
            className="nav-link-line font-[var(--font-body)] font-semibold transition-colors whitespace-nowrap text-[var(--color-slate)] hover:text-[var(--color-primary)]"
          >
            {link.label}
          </a>
        ))}

        <button
          ref={ctaRef}
          type="button"
          onClick={onCtaClick}
          className="px-5 py-2 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-all duration-300 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          {content.nav.cta}
        </button>
      </div>
    </div>
  )
}
