import { content } from "../../data/content"
import logoJaho from "../../assets/logojaho.jpg"

export default function NavbarDesktop({ links, onCtaClick, linkRefs, ctaRef, onNavLinkClick }) {
  return (
    <div className="hidden lg:flex items-center justify-between gap-6 w-full">
      <a
        href="/"
        onClick={(e) => onNavLinkClick?.(e, "/")}
        className="flex min-w-0 items-center"
        aria-label={content.brand}
        data-nav-anim
      >
        <span className="relative h-12 w-[13.5rem] shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
          <img
            src={logoJaho}
            alt={content.brand}
            className="absolute left-1/2 top-1/2 h-[195%] w-auto max-w-none -translate-x-1/2 -translate-y-[48%]"
          />
        </span>
      </a>

      <div className="flex items-center gap-7 xl:gap-9 shrink-0">
        {links.map((link, i) => (
          <a
            key={`${link.href}-${link.label}`}
            ref={(el) => (linkRefs.current[i] = el)}
            href={link.href}
            onClick={(e) => onNavLinkClick?.(e, link.href)}
            className="nav-link-line font-[var(--font-body)] text-[0.92rem] font-semibold whitespace-nowrap text-[var(--color-slate)] transition-colors hover:text-[var(--color-dark)]"
            data-nav-anim
          >
            {link.label}
          </a>
        ))}

        <button
          ref={ctaRef}
          type="button"
          onClick={onCtaClick}
          className="btn btn--primary btn--md"
          data-nav-anim
        >
          {content.nav.cta}
        </button>
      </div>
    </div>
  )
}
