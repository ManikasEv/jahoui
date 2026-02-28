export default function HeroMobile({ data, titleRef, subtitleRef, badgeRef, ctaRefs }) {
    return (
      <div className="md:hidden">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/70 backdrop-blur font-semibold text-sm text-[var(--color-slate)]"
        >
          {data.badge}
        </div>
  
        <h1
          ref={titleRef}
          className="mt-5 font-heading text-[var(--color-dark)] text-4xl leading-[1.06] tracking-tight select-none"
        >
          {data.title.split("").map((ch, i) => (
            <span key={i} data-letter className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
  
        <div
          data-underline
          className="mt-4 h-1 w-40 origin-left scale-x-0 rounded-full bg-[var(--color-primary)]/30"
        />
  
        <p ref={subtitleRef} className="mt-5 font-body text-[var(--color-slate)]">
          {data.subtitle}
        </p>
  
        <div className="mt-6 flex flex-wrap gap-2">
          {data.chips.map((t) => (
            <span
              key={t}
              data-chip
              className="px-3 py-1 rounded-full border border-black/10 bg-white/60 backdrop-blur font-semibold text-sm text-[var(--color-dark)] inline-flex"
            >
              {t}
            </span>
          ))}
        </div>
  
        <div className="mt-6 flex flex-col gap-3">
          <button
            ref={(el) => (ctaRefs.current[0] = el)}
            onClick={() => (window.location.href = data.ctas[0].href)}
            className="group relative w-full px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {data.ctas[0].label}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
            <span className="absolute inset-0 bg-[var(--color-primary)]/90 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>

          <a
            ref={(el) => (ctaRefs.current[1] = el)}
            href={data.ctas[1].href}
            className="group relative w-full px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold border-2 border-[var(--color-primary)] text-[var(--color-primary)] inline-flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {data.ctas[1].label}
              <span className="inline-block transition-all group-hover:rotate-[-45deg] group-hover:translate-x-1 group-hover:translate-y-[-2px]">↗</span>
            </span>
            <span className="absolute inset-0 bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            <span className="absolute inset-0 text-white transition-colors z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              {data.ctas[1].label}
              <span className="inline-block">↗</span>
            </span>
          </a>
        </div>
      </div>
    )
  }
