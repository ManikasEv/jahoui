export default function HeroDesktop({
    data,
    titleRef,
    subtitleRef,
    badgeRef,
    ctaRef,
  }) {
    return (
      <div className="hidden md:grid grid-cols-12 gap-12 items-center">
        <div className="col-span-7">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/70 backdrop-blur font-semibold text-sm text-[var(--color-slate)] mb-6"
          >
            {data.badge}
          </div>
  
          <h1
            ref={titleRef}
            className="font-[var(--font-heading)] text-[var(--color-dark)] text-4xl lg:text-5xl leading-[1.3] tracking-tight mb-6 max-w-[600px]"
          >
            {data.title.split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-[0.3em]">
                {word.split("").map((ch, charIndex) => (
                  <span key={charIndex} data-letter className="inline-block">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
  
          <p
            ref={subtitleRef}
            className="font-[var(--font-body)] text-[var(--color-slate)] text-lg leading-relaxed mb-8 max-w-xl"
          >
            {data.subtitle}
          </p>
  
          <button
            ref={ctaRef}
            onClick={() => (window.location.href = "#contact")}
            className="group relative px-8 py-4 rounded-xl font-[var(--font-body)] font-semibold bg-[var(--color-primary)] text-white text-lg overflow-visible"
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
  
        <div className="col-span-5">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 border border-black/10">
            <img 
              src={data.image} 
              alt={data.imageAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center"><div class="text-center"><div class="text-6xl mb-4">🔧</div><div class="font-semibold text-gray-600">Bild kommt bald</div></div></div>'
              }}
            />
          </div>
        </div>
      </div>
    )
  }
