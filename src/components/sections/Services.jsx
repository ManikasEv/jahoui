import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { content } from "../../data/content"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const titleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with flip animation
      const titleChars = titleRef.current.querySelectorAll("[data-char]")
      gsap.from(titleChars, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        rotateY: 180,
        x: -20,
        stagger: 0.02,
        duration: 0.7,
        ease: "back.out(2)",
      })

      // Text words with slide
      const words = textRef.current.querySelectorAll("[data-word]")
      gsap.from(words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 0,
        x: -30,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      })

      // Animate cards with 3D effect
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        const cardTitle = card.querySelector("[data-card-title]")
        const cardDesc = card.querySelector("[data-card-desc]")
        const titleChars = cardTitle ? cardTitle.querySelectorAll("[data-char]") : []
        const descWords = cardDesc ? cardDesc.querySelectorAll("[data-word]") : []

        // Card entrance
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          scale: 0.8,
          rotateX: -45,
          y: 60,
          duration: 0.7,
          delay: index * 0.1,
          ease: "power3.out",
        })

        // Card title characters
        gsap.from(titleChars, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 20,
          stagger: 0.02,
          duration: 0.5,
          delay: index * 0.1 + 0.3,
          ease: "power2.out",
        })

        // Card description words
        gsap.from(descWords, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
          opacity: 0,
          y: 10,
          stagger: 0.02,
          duration: 0.4,
          delay: index * 0.1 + 0.5,
          ease: "power2.out",
        })

        // 3D tilt effect on hover
        const onMove = (e) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = ((y - centerY) / centerY) * -10
          const rotateY = ((x - centerX) / centerX) * 10

          gsap.to(card, {
            rotateX,
            rotateY,
            z: 20,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
          })
        }

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        card.addEventListener("mousemove", onMove)
        card.addEventListener("mouseleave", onLeave)

        return () => {
          card.removeEventListener("mousemove", onMove)
          card.removeEventListener("mouseleave", onLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="mx-auto w-full max-w-[1100px] px-6 py-20"
    >
      <h2 ref={titleRef} className="font-[var(--font-heading)] text-4xl md:text-5xl text-[var(--color-dark)] mb-4">
        {content.sections.services.title.split("").map((char, i) => (
          <span key={i} className="inline-block" data-char>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      <p ref={textRef} className="font-[var(--font-body)] text-lg text-[var(--color-slate)] mb-12 max-w-2xl">
        {content.sections.services.text.split(" ").map((word, i) => (
          <span key={i} className="inline-block mr-[0.3em]" data-word>
            {word}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.sections.services.items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-8 overflow-hidden cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-primary)]/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{getIcon(item.icon)}</span>
              </div>
              
              <h3 data-card-title className="font-[var(--font-heading)] text-2xl text-[var(--color-dark)] mb-3">
                {item.title.split("").map((char, i) => (
                  <span key={i} className="inline-block" data-char>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h3>
              
              <p data-card-desc className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed">
                {item.description.split(" ").map((word, i) => (
                  <span key={i} className="inline-block mr-[0.3em]" data-word>
                    {word}
                  </span>
                ))}
              </p>
            </div>

            <div
              className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[var(--color-primary)]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ transform: "translateZ(-20px)" }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function getIcon(icon) {
  const icons = {
    bath: "🛁",
    home: "🏠",
    grid: "⬜",
    tools: "🔧",
  }
  return icons[icon] || "✨"
}
