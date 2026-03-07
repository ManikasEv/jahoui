import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"

// Import images
import p1 from "../../assets/p1.jpg"
import p2 from "../../assets/p2.jpg"
import p3 from "../../assets/p3.jpg"
import p4 from "../../assets/p4.jpg"
import p5 from "../../assets/p5.jpg"
import p6 from "../../assets/p6.jpg"
import p7 from "../../assets/p7.jpg"

gsap.registerPlugin(ScrollTrigger)

const projectImages = [p1, p2, p3, p4, p5, p6, p7]

export default function Projects() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = content.sections.projects.items

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with spiral animation
      const titleChars = titleRef.current.querySelectorAll("[data-char]")
      gsap.from(titleChars, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
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
          once: true,
        },
        opacity: 0,
        y: 20,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out",
      })

      // Animate carousel entrance
      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getVisibleProjects = () => {
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length
    const nextIndex = (activeIndex + 1) % projects.length
    return [
      { index: prevIndex, position: 'left' },
      { index: activeIndex, position: 'center' },
      { index: nextIndex, position: 'right' }
    ]
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const visibleProjects = getVisibleProjects()

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mx-auto w-full max-w-[1400px] px-6 py-20"
    >
      <h2 ref={titleRef} className="font-[var(--font-heading)] text-4xl md:text-5xl text-[var(--color-dark)] mb-4 text-center">
        {content.sections.projects.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p ref={textRef} className="font-[var(--font-body)] text-lg text-[var(--color-slate)] mb-16 max-w-2xl mx-auto text-center">
        {content.sections.projects.text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.3em]" data-word>
            {word}
          </span>
        ))}
      </p>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Vorheriges Projekt"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
          aria-label="Nächstes Projekt"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Carousel */}
        <div 
          ref={carouselRef}
          className="flex items-center justify-center gap-8 px-20 py-8"
        >
          {visibleProjects.map(({ index: projectIndex, position }) => {
            const project = projects[projectIndex]
            const isCenter = position === 'center'
            const imageSrc = projectImages[projectIndex]
            
            return (
              <div
                key={`${projectIndex}-${position}`}
                className={`transition-all duration-700 ease-out ${
                  isCenter 
                    ? 'w-[450px] h-[550px] z-10' 
                    : 'w-[320px] h-[400px] z-0 opacity-50'
                }`}
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
                  {/* Actual Image */}
                  <img 
                    src={imageSrc} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Glow effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    style={{ 
                      boxShadow: `inset 0 0 60px rgba(196, 30, 58, 0.2)` 
                    }} 
                  />

                  {/* Only number badge for side cards */}
                  {!isCenter && (
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center font-bold text-[var(--color-dark)] shadow-lg">
                      {projectIndex + 1}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[var(--color-primary)] w-10' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2'
              }`}
              aria-label={`Gehe zu Projekt ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
