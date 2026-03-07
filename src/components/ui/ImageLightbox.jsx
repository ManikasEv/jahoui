import { useEffect } from "react"
import { gsap } from "gsap"

export default function ImageLightbox({ imageSrc, onClose, altText }) {
  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    
    // Animate in
    gsap.fromTo('.lightbox-backdrop',
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    
    gsap.fromTo('.lightbox-image',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    )
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    gsap.to('.lightbox-backdrop', {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose
    })
    
    gsap.to('.lightbox-image', {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    })
  }

  return (
    <div 
      className="lightbox-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
        aria-label="Schließen"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <img
        src={imageSrc}
        alt={altText}
        className="lightbox-image max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
