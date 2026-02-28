import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const [flippedCards, setFlippedCards] = useState([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with spiral animation
      const titleChars = titleRef.current.querySelectorAll("[data-char]")
      gsap.from(titleChars, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.3,
        rotation: 180,
        stagger: {
          each: 0.03,
          from: "center"
        },
        duration: 0.8,
        ease: "back.out(2)",
      })

      // Text with typewriter effect
      const words = textRef.current.querySelectorAll("[data-word]")
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
      })

      // Animate cards entrance with bounce
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.7,
          y: 80,
          rotation: -15,
          duration: 0.9,
          delay: index * 0.15,
          ease: "elastic.out(1, 0.7)",
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardClick = (index) => {
    const card = cardsRef.current[index]
    if (!card) return

    const isFlipped = flippedCards.includes(index)
    
    gsap.to(card, {
      rotateY: isFlipped ? 0 : 180,
      duration: 0.8,
      ease: "power2.inOut",
      transformStyle: "preserve-3d",
    })

    setFlippedCards(prev => 
      isFlipped 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleCardHover = (card, isEntering) => {
    if (!card) return

    gsap.to(card, {
      y: isEntering ? -10 : 0,
      scale: isEntering ? 1.02 : 1,
      boxShadow: isEntering 
        ? "0 20px 40px rgba(0,0,0,0.15)" 
        : "0 10px 20px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mx-auto w-full max-w-[1100px] px-6 py-20"
    >
      <h2 ref={titleRef} className="font-[var(--font-heading)] text-4xl md:text-5xl text-[var(--color-dark)] mb-4">
        {content.sections.projects.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p ref={textRef} className="font-[var(--font-body)] text-lg text-[var(--color-slate)] mb-12 max-w-2xl">
        {content.sections.projects.text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.3em]" data-word>
            {word}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.sections.projects.items.map((item, index) => (
          <div
            key={index}
            className="perspective-1000"
            style={{ perspective: "1000px" }}
          >
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative w-full h-80 cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
              }}
              onClick={() => handleCardClick(index)}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <div className="absolute inset-0 bg-[var(--color-primary)]/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white text-sm font-semibold mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-[var(--font-heading)] text-2xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      Klicken für Details
                    </p>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden bg-white border border-black/10"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)]/10 mb-4">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-2xl text-[var(--color-dark)] mb-3">
                    {item.title}
                  </h3>
                  <p className="font-[var(--font-body)] text-[var(--color-slate)] mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
