import { useRef } from "react"
import profilePhoto from "../../assets/profile.jpg"
import { content } from "../../data/content"
import { useReveal } from "../../hooks/useReveal"

export default function About() {
  const sectionRef = useRef(null)
  const about = content.sections.about

  useReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className="section-band py-16 sm:py-20 lg:py-24">
      <div className="content-shell">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <div data-reveal className="lg:col-span-4">
            <div className="img-frame mx-auto max-w-sm rounded-2xl lg:mx-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-[var(--shadow-card)]">
                <img
                  src={profilePhoto}
                  alt={`${about.name}, Plattenleger und Fliesenleger Schweiz`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="mt-7 text-center lg:text-left">
              <p className="font-[var(--font-heading)] text-xl font-bold text-[var(--color-dark)]">
                {about.name}
              </p>
              <span className="title-rule mx-auto mt-3 !mb-0 lg:mx-0" aria-hidden />
            </div>
          </div>

          {/* Bio */}
          <div className="min-w-0 lg:col-span-8">
            <div data-reveal>
              <span className="title-rule" aria-hidden />
              <h2 className="section-title mb-8">{about.title}</h2>
            </div>

            <div className="space-y-5">
              {about.bio.map((paragraph, pi) => (
                <p
                  key={pi}
                  data-bio
                  data-reveal
                  className="font-[var(--font-body)] text-[0.98rem] leading-[1.85] text-[var(--color-slate)] sm:text-base text-safe"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
