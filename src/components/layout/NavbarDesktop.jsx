import { content } from "../../data/content"

export default function NavbarDesktop({ links, onCtaClick, linkRefs, ctaRef }) {
  return (
    <div className="hidden lg:flex items-center justify-between gap-4">
      <div className="font-[var(--font-heading)] text-2xl text-[var(--color-dark)] font-bold whitespace-nowrap">
        {content.brand.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 xl:gap-8">
        {links.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => (linkRefs.current[i] = el)}
            href={link.href}
            className="font-[var(--font-body)] font-semibold text-[var(--color-slate)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap"
          >
            {link.label.split("").map((char, idx) => (
              <span key={idx} className="inline-block" data-char>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </a>
        ))}

        <div className="relative" ref={ctaRef}>
          {/* Animated particles container */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <span className="particle absolute text-lg opacity-0" data-particle="1">✨</span>
            <span className="particle absolute text-lg opacity-0" data-particle="2">⚡</span>
            <span className="particle absolute text-lg opacity-0" data-particle="3">🔧</span>
            <span className="particle absolute text-lg opacity-0" data-particle="4">✓</span>
            <span className="particle absolute text-sm opacity-0" data-particle="5">●</span>
            <span className="particle absolute text-sm opacity-0" data-particle="6">●</span>
          </div>
          
          <button
            onClick={onCtaClick}
            className="relative px-5 py-2 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90 transition-colors whitespace-nowrap"
          >
            {content.nav.cta.split("").map((char, i) => (
              <span key={i} className="inline-block" data-char>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </button>
        </div>
      </div>
    </div>
  )
}
