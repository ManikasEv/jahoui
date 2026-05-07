import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import NavbarDesktop from "./NavbarDesktop"
import NavbarMobile from "./NavbarMobile"
import { navbarAnimation, mobileMenuAnimation } from "../../animations/navbarAnimation"
import { content } from "../../data/content"

export default function Navbar() {
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const ctaRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const panelRef = useRef(null)
  const itemRefs = useRef([])

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

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      setIsScrolled(y > 8)
    }

    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

    if (!href.startsWith("#")) return

    e.preventDefault()
    // If we’re not on home, route to "/#section" first.
    if (location.pathname !== "/") {
      navigate(`/${href}`)
      return
    }

    // Already on home: just update hash so App scroll handler runs.
    navigate(href)
  }

  const goContact = useCallback(() => {
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: "#contact" })
      return
    }
    navigate("#contact")
  }, [location.pathname, navigate])

  return (
    <nav
      ref={navRef}
      className={[
        "w-full sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--color-bg)]/82 backdrop-blur-lg border-b border-black/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-b border-transparent",
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
