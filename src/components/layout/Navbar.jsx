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
        "fixed top-0 left-0 right-0 z-50 transition-[transform,background-color,box-shadow,border-color] duration-300 ease-out",
        navVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-[var(--color-bg)]/90 backdrop-blur-lg border-b border-black/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]"
          : "bg-[var(--color-bg)]/70 backdrop-blur-md border-b border-black/[0.06]",
      ].join(" ")}
    >
      <div className="w-full px-4 md:px-8 xl:px-10 py-4">
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
