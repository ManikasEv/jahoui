import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"
import profilePhoto from "../../assets/profile.jpg"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll("[data-char]")

      // Animate title with rotation and wave
      gsap.from(titleChars, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        rotateX: -90,
        y: 50,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.5)",
      })

      // Animate image
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.5)",
      })

      // Animate bio paragraphs
      const bioElements = sectionRef.current.querySelectorAll("[data-bio]")
      gsap.from(bioElements, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      })

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="mx-auto w-full max-w-[1100px] px-6 py-20"
    >
      <h2 
        ref={titleRef}
        className="section-title mb-8 md:mb-10 text-center"
      >
        {content.sections.about.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Circular Image */}
        <div className="flex justify-center md:justify-start">
          <div 
            ref={imageRef}
            className="profile-halo relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[var(--color-primary)] bg-gray-200"
          >
            <img 
              src={profilePhoto} 
              alt={content.sections.about.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Bio Text */}
        <div className="md:col-span-2 space-y-4">
          {content.sections.about.bio.map((paragraph, i) => (
            <p 
              key={i}
              data-bio
              className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <p 
            data-bio
            className="font-[var(--font-heading)] text-lg text-[var(--color-dark)] mt-6"
          >
            {content.sections.about.name}
          </p>
        </div>
      </div>
    </section>
  )
}
