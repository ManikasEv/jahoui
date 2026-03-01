import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleChars = titleRef.current.querySelectorAll("[data-char]")
      const words = textRef.current.querySelectorAll("[data-word]")

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

      // Animate words with scale and bounce
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        scale: 0.5,
        y: 30,
        rotateZ: -10,
        stagger: 0.05,
        duration: 0.7,
        ease: "elastic.out(1, 0.6)",
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
        className="font-[var(--font-heading)] text-4xl md:text-5xl text-[var(--color-dark)]"
      >
        {content.sections.about.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p 
        ref={textRef}
        className="mt-6 font-[var(--font-body)] text-lg text-[var(--color-slate)] max-w-2xl leading-relaxed"
      >
        {content.sections.about.text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.3em]" data-word>
            {word}
          </span>
        ))}
      </p>
    </section>
  )
}
