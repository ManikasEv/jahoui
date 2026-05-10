import { Link } from "react-router-dom"
import Seo from "../seo/Seo"
import BackToHome from "../components/layout/BackToHome"
import Contact from "../components/sections/Contact"
import GalleryShowcase from "../components/sections/GalleryShowcase"
import { cityLandings } from "../data/cityLandings"
import { buildCityLandingJsonLd } from "../seo/jsonLd"

export default function CityPlattenleger({ cityId }) {
  const cfg = cityLandings[cityId]
  if (!cfg) return null

  const jsonLd = buildCityLandingJsonLd({
    title: cfg.h1,
    path: cfg.path,
    cityName: cfg.cityName,
    regionNote: cfg.seoDescription,
  })

  return (
    <>
      <Seo title={cfg.seoTitle} description={cfg.seoDescription} path={cfg.path} jsonLd={jsonLd} />

      <section className="mx-auto w-full min-w-0 content-shell content-shell--article pt-12 pb-10">
        <BackToHome className="mb-6" />
        <h1 className="hero-title mb-4">{cfg.h1}</h1>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-3xl text-safe">
          {cfg.lead}
        </p>
        <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed max-w-3xl text-safe">
          Verwandte Seiten:{" "}
          <Link to="/leistungen" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Leistungen
          </Link>
          {" · "}
          <Link to="/badrenovation-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Bad Renovation Zürich
          </Link>
          {" · "}
          <Link to="/kueche-fliesen-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Küchen Fliesen Zürich
          </Link>
          {" · "}
          <Link to="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Galerie
          </Link>
          {" · "}
          <Link to="/#contact" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Kontakt
          </Link>
        </p>
      </section>

      <section className="mx-auto w-full min-w-0 content-shell content-shell--article py-10">
        <h2 className="section-title mb-4">{cfg.servicesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cfg.services.map((item) => (
            <div key={item.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 depth-shadow">
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-2">
                {item.title}
              </h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 content-shell content-shell--article py-10">
        <h2 className="section-title mb-4">{cfg.whyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cfg.why.map((item) => (
            <div key={item.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
              <h3 className="font-[var(--font-heading)] text-xl leading-snug text-[var(--color-dark)] mb-2">{item.title}</h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 content-shell content-shell--article py-10">
        <h2 className="section-title mb-4">{cfg.costTitle}</h2>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed max-w-3xl text-safe">{cfg.costText}</p>
      </section>

      <GalleryShowcase title={cfg.galleryTitle} />

      <section className="mx-auto w-full min-w-0 content-shell content-shell--article py-10">
        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-4">
          {cfg.faq.map((item) => (
            <details key={item.q} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
              <summary className="font-[var(--font-heading)] text-lg md:text-xl leading-snug text-[var(--color-dark)] cursor-pointer">
                {item.q}
              </summary>
              <p className="mt-3 font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Contact />
    </>
  )
}
