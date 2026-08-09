import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavbarDesktop from "./NavbarDesktop"
import NavbarMobile from "./NavbarMobile"
import { navbarAnimation, mobileMenuAnimation } from "../../animations/navbarAnimation"
import { content } from "../../data/content"
import { useScrollDirection } from "../../hooks/useScrollDirection"

export default function Navbar() {
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const ctaRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const { visible: scrollVisible, scrolled: isScrolled } = useScrollDirection()
  const panelRef = useRef(null)
  const itemRefs = useRef([])

  const navVisible = isOpen || scrollVisible
  useEffect(() => {
    // Run after paint so refs are definitely populated (prevents "stuck at opacity 0").
    const id = window.requestAnimationFrame(() => {
      if (!navRef.current) return
      navbarAnimation({ nav: navRef.current })
    })
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    mobileMenuAnimation({ panel: panelRef.current, items: itemRefs.current, isOpen })
  }, [isOpen])

  const closeMobile = () => setIsOpen(false)

  const assignMobileItemRef = useCallback((index, el) => {
    itemRefs.current[index] = el
  }, [])

  const onNavLinkClick = (e, href) => {
    if (!href) return

    if (href === "/") {
      e.preventDefault()
      navigate("/")
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      })
      return
    }

    // /#section — crawlable path + hash (works from any page)
    if (href.startsWith("/#")) {
      e.preventDefault()
      const sectionId = href.slice(2)
      if (location.pathname !== "/") {
        navigate({ pathname: "/", hash: sectionId })
      } else {
        navigate({ hash: sectionId })
      }
      return
    }

    if (!href.startsWith("#")) return

    e.preventDefault()
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: href.slice(1) })
      return
    }

    navigate({ hash: href.slice(1) })
  }

  const goContact = useCallback(() => {
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: "contact" })
      return
    }
    navigate({ hash: "contact" })
  }, [location.pathname, navigate])

  return (
    <nav
      ref={navRef}
      className={[
        "fixed top-0 left-0 right-0 z-50 will-change-transform transition-[transform,background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        navVisible ? "translate-y-0" : "-translate-y-[110%]",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg border-b border-black/[0.08] shadow-[0_12px_32px_-24px_rgba(18,20,23,0.35)]"
          : "bg-white/60 backdrop-blur-md border-b border-transparent",
      ].join(" ")}
    >
      <div className="content-shell py-3.5">
        <NavbarDesktop
          links={content.nav.links}
          onCtaClick={goContact}
          linkRefs={linkRefs}
          ctaRef={ctaRef}
          onNavLinkClick={onNavLinkClick}
          isScrolled={isScrolled}
        />
        <NavbarMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          links={content.nav.links}
          panelRef={panelRef}
          assignMobileItemRef={assignMobileItemRef}
          onLinkClick={closeMobile}
          onNavLinkClick={onNavLinkClick}
          onCtaClick={goContact}
          isScrolled={isScrolled}
        />
      </div>
    </nav>
  )
}
