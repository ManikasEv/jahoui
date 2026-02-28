export default function HeroDesktop({
    data,
    titleRef,
    subtitleRef,
    badgeRef,
    rightCardRef,
    ctaRefs,
  }) {
    return (
      <div className="hidden md:grid grid-cols-12 gap-10 items-center relative">
        <div className="col-span-7">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-white/70 backdrop-blur font-semibold text-sm text-[var(--color-slate)]"
          >
            {data.badge}
          </div>
  
          <div className="relative mt-5">
            <h1
              ref={titleRef}
              className="font-heading text-[var(--color-dark)] text-6xl leading-[1.02] tracking-tight select-none"
            >
              {data.title.split("").map((ch, i) => (
                <span key={i} data-letter className="inline-block">
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
  
            <div
              data-underline
              className="mt-4 h-1 w-44 origin-left scale-x-0 rounded-full bg-[var(--color-primary)]/30"
            />
          </div>
  
          <p
            ref={subtitleRef}
            className="mt-6 font-body text-[var(--color-slate)] text-lg max-w-xl"
          >
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
  
          <div className="mt-8 flex gap-3 items-center">
            <button
              ref={(el) => (ctaRefs.current[0] = el)}
              onClick={() => (window.location.href = data.ctas[0].href)}
              className="group relative px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {data.ctas[0].label}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
              <span className="absolute inset-0 bg-[var(--color-primary)]/90 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </button>
  
            <a
              ref={(el) => (ctaRefs.current[1] = el)}
              href={data.ctas[1].href}
              className="group relative px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold border-2 border-[var(--color-primary)] text-[var(--color-primary)] inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {data.ctas[1].label}
                <span className="inline-block transition-all group-hover:rotate-[-45deg] group-hover:translate-x-1 group-hover:translate-y-[-2px]">↗</span>
              </span>
              <span className="absolute inset-0 bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              <span className="absolute inset-0 group-hover:text-white transition-colors z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {data.ctas[1].label}
                <span className="inline-block">↗</span>
              </span>
            </a>
  
            <span className="ml-2 font-[var(--font-body)] text-sm text-[var(--color-slate)]">
              {data.note}
            </span>
          </div>
        </div>
  
        <div className="col-span-5">
          <div
            ref={rightCardRef}
            className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur p-6 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-heading text-xl text-[var(--color-dark)]">
                  {data.rightCard.title}
                </div>
                <div className="mt-1 font-body text-sm text-[var(--color-slate)]">
                  {data.rightCard.subtitle}
                </div>
              </div>
  
              <div className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-dark)] font-semibold text-sm border border-black/5">
                {data.rightCard.tag}
              </div>
            </div>
  
            <ul className="mt-5 space-y-3 font-body text-[var(--color-slate)]">
              {data.rightCard.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]/60" />
                  {b}
                </li>
              ))}
            </ul>
  
            <div className="mt-6 rounded-2xl bg-[var(--color-primary)]/10 p-4 border border-black/5">
              <div className="font-semibold text-[var(--color-dark)]">
                {data.rightCard.calloutTitle}
              </div>
              <div className="text-[var(--color-slate)]">
                {data.rightCard.calloutText}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
