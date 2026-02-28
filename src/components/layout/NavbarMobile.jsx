import { content } from "../../data/content"

export default function NavbarMobile({ isOpen, setIsOpen, links, panelRef, itemRefs, onLinkClick }) {
  return (
    <>
      <div className="lg:hidden flex items-center justify-between">
        <div className="font-[var(--font-heading)] text-xl text-[var(--color-dark)] font-bold">
          {content.brand}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-xl border border-black/10 bg-white/60 backdrop-blur font-[var(--font-body)] font-semibold text-[var(--color-dark)]"
        >
          {isOpen ? content.nav.mobileClose : content.nav.mobileOpen}
        </button>
      </div>

      <div
        ref={panelRef}
        className="lg:hidden overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-6 space-y-3">
          {links.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => (itemRefs.current[i] = el)}
              href={link.href}
              onClick={onLinkClick}
              className="block px-4 py-2 rounded-xl border border-black/10 bg-white/60 backdrop-blur font-[var(--font-body)] font-semibold text-[var(--color-dark)] hover:bg-white transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            ref={(el) => (itemRefs.current[links.length] = el)}
            onClick={() => {
              window.location.href = "#contact"
              onLinkClick()
            }}
            className="w-full px-4 py-2 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white"
          >
            {content.nav.cta}
          </button>
        </div>
      </div>
    </>
  )
}
