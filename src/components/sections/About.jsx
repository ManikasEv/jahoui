import { content } from "../../data/content"
import profilePhoto from "../../assets/profile.jpg"
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll"

export default function About() {
  const [ref, shown] = useRevealOnScroll()

  return (
    <section
      id="about"
      ref={ref}
      className={[
        "mx-auto w-full max-w-[80vw] px-6 py-14 reveal-group",
        shown ? "is-visible" : "",
      ].join(" ")}
    >
      <h2
        className="reveal-from-y section-title mb-8 md:mb-10 text-center"
        style={{ ["--reveal-delay"]: 0 }}
      >
        {content.sections.about.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div
          className="reveal-from-y flex justify-center md:justify-start"
          style={{ ["--reveal-delay"]: 80 }}
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[var(--color-primary)] bg-gray-200 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.2)] transition-transform duration-500 hover:scale-[1.03]">
            <img
              src={profilePhoto}
              alt={content.sections.about.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div
          className="reveal-from-y md:col-span-2 space-y-4"
          style={{ ["--reveal-delay"]: 150 }}
        >
          {content.sections.about.bio.map((paragraph, i) => (
            <p
              key={i}
              data-bio
              className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
          <p className="font-[var(--font-heading)] text-lg text-[var(--color-dark)] mt-6">
            {content.sections.about.name}
          </p>
        </div>
      </div>
    </section>
  )
}
