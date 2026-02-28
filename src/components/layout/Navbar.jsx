import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import NavbarDesktop from "./NavbarDesktop"
import NavbarMobile from "./NavbarMobile"
import { navbarAnimation, mobileMenuAnimation } from "../../animations/navbarAnimation"
import { content } from "../../data/content"

export default function Navbar() {
  const navRef = useRef(null)
  const linkRefs = useRef([])
  const ctaRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      navbarAnimation({ nav: navRef.current, links: linkRefs.current, cta: ctaRef.current })
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    mobileMenuAnimation({ panel: panelRef.current, items: itemRefs.current, isOpen })
  }, [isOpen])

  const closeMobile = () => setIsOpen(false)

  return (
    <nav ref={navRef} className="w-full sticky top-0 z-50 bg-[var(--color-bg)]/80 backdrop-blur border-b border-black/5">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-4">
        <NavbarDesktop 
          links={content.nav.links} 
          onCtaClick={() => (window.location.href = "#contact")} 
          linkRefs={linkRefs} 
          ctaRef={ctaRef} 
        />
        <NavbarMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          links={content.nav.links}
          panelRef={panelRef}
          itemRefs={itemRefs}
          onLinkClick={closeMobile}
        />
      </div>
    </nav>
  )
}
