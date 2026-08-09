import { content } from "../../data/content"
import logoJaho from "../../assets/logojaho.jpg"

export default function NavbarMobile({
  isOpen,
  setIsOpen,
  links,
  panelRef,
  assignMobileItemRef,
  onLinkClick,
  onNavLinkClick,
  onCtaClick,
}) {
  return (
    <>
      <div className="lg:hidden flex items-center justify-between gap-3 min-w-0">
        <a
          href="/"
          onClick={(e) => {
            onNavLinkClick?.(e, "/")
            onLinkClick?.()
          }}
          className="flex min-w-0 flex-1 items-center"
          aria-label={content.brand}
          data-nav-anim
        >
          <span className="relative h-10 w-[11rem] shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 sm:h-11 sm:w-[12.5rem]">
            <img
              src={logoJaho}
              alt={content.brand}
              className="absolute left-1/2 top-1/2 h-[195%] w-auto max-w-none -translate-x-1/2 -translate-y-[48%]"
            />
          </span>
        </a>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 font-[var(--font-body)] text-sm font-semibold text-[var(--color-dark)] shadow-sm"
          data-nav-anim
        >
          <span className="relative flex h-3 w-4 flex-col justify-between" aria-hidden>
            <span
              className={[
                "block h-[2px] w-full rounded-full bg-current transition-transform duration-300",
                isOpen ? "translate-y-[5px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-full rounded-full bg-current transition-opacity duration-200",
                isOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-full rounded-full bg-current transition-transform duration-300",
                isOpen ? "-translate-y-[5px] -rotate-45" : "",
              ].join(" ")}
            />
          </span>
          {isOpen ? content.nav.mobileClose : content.nav.mobileOpen}
        </button>
      </div>

      <div ref={panelRef} className="lg:hidden overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="pt-5 pb-2">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[var(--shadow-card)]">
            {links.map((link, i) => (
              <a
                key={`${link.href}-${link.label}`}
                ref={(el) => assignMobileItemRef(i, el)}
                href={link.href}
                onClick={(e) => {
                  onNavLinkClick?.(e, link.href)
                  onLinkClick?.()
                }}
                className="block border-b border-black/[0.06] px-5 py-3.5 font-[var(--font-body)] font-semibold text-[var(--color-dark)] transition-colors last:border-b-0 hover:bg-[var(--color-bg)] hover:text-[var(--color-primary)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            ref={(el) => assignMobileItemRef(links.length, el)}
            onClick={() => {
              onCtaClick?.()
              onLinkClick?.()
            }}
            className="btn btn--primary btn--md mt-3 w-full"
          >
            {content.nav.cta}
          </button>
        </div>
      </div>
    </>
  )
}
