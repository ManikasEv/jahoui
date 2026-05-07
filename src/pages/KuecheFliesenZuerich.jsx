import { Link } from "react-router-dom"
import Seo from "../seo/Seo"
import { content } from "../data/content"
import BackToHome from "../components/layout/BackToHome"
import Contact from "../components/sections/Contact"
import GalleryShowcase from "../components/sections/GalleryShowcase"

export default function KuecheFliesenZuerich() {
  return (
    <>
      <Seo
        title={`Küchen Fliesen Zürich – Modern & Langlebig | ${content.brand}`}
        description="Küchen Fliesen in Zürich: Rückwände, Wandfliesen und Übergänge – modern, pflegeleicht und langlebig. Referenzen ansehen und Offerte anfragen."
        path="/kueche-fliesen-zuerich"
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-10">
        <BackToHome className="mb-6" />
        <h1 className="hero-title mb-4">Küchen Fliesen Zürich – Modern & Langlebig</h1>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-3xl text-safe">
          Ob Rückwand, Wand oder Boden: Küchenfliesen müssen robust, pflegeleicht und optisch stimmig sein. Wir beraten zu Material,
          Format und Übergängen – und verlegen sauber bis ins Detail.
        </p>
        <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed max-w-3xl">
          Passende Übersicht:{" "}
          <Link to="/plattenleger-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Plattenleger Zürich
          </Link>
          {" · "}
          <Link to="/badrenovation-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
            Bad Renovation Zürich
          </Link>
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Beliebte Lösungen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Küchenrückwand", text: "Schutz & Design – leicht zu reinigen, langlebig und präzise geschnitten." },
            { title: "Materialien", text: "Feinsteinzeug, Keramik, Grossformat – passend zu Stil, Budget und Nutzung." },
            { title: "Übergänge", text: "Saubere Abschlüsse, Kanten, Sockel und Ecken – optisch ruhig und stabil." },
            { title: "Vorteile", text: "Hygienisch, pflegeleicht und widerstandsfähig gegen Feuchtigkeit und Hitze." },
          ].map((i) => (
            <div key={i.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 depth-shadow">
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-2">
                {i.title}
              </h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      <GalleryShowcase title="Küchen Referenzen" />

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Welche Fliesen sind für die Küchenrückwand ideal?",
              a: "Pflegeleichte Oberflächen und saubere Fugen sind entscheidend – wir empfehlen passende Formate je nach Wand und Küche.",
            },
            {
              q: "Kann ich Grossformat in der Küche einsetzen?",
              a: "Ja – Grossformat wirkt modern und hat weniger Fugen. Wichtig sind Untergrund und präzise Verarbeitung.",
            },
          ].map((item) => (
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

