export default function HeroMobile({ data, titleRef, subtitleRef, badgeRef, ctaRef }) {
    return (
      <div className="md:hidden">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur font-semibold text-sm text-[var(--color-slate)] mb-6"
        >
          {data.badge}
        </div>

        <h1
          ref={titleRef}
          className="font-[var(--font-heading)] text-[var(--color-dark)] text-3xl leading-[1.15] tracking-tight mb-4"
        >
          {data.title.split("").map((ch, i) => (
            <span key={i} data-letter className="inline-block">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p ref={subtitleRef} className="font-[var(--font-body)] text-[var(--color-slate)] mb-6">
          {data.subtitle}
        </p>

        <div className="mb-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 border border-black/10">
          <img 
            src={data.image} 
            alt={data.imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center"><div class="text-center"><div class="text-5xl mb-3">🔧</div><div class="font-semibold text-gray-600 text-sm">Bild kommt bald</div></div></div>'
            }}
          />
        </div>

        <button
          ref={ctaRef}
          onClick={() => (window.location.href = "#contact")}
          className="group relative w-full px-6 py-3 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white overflow-visible"
          data-cta-primary
        >
          <span className="absolute inset-0 rounded-xl overflow-hidden">
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </span>
          
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: "0.1s" }} />
          
          <span className="relative z-10">
            {data.cta}
          </span>
        </button>
      </div>
    )
  }
