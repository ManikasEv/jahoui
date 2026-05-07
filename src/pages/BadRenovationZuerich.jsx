import Seo from "../seo/Seo"
import BackToHome from "../components/layout/BackToHome"
import Contact from "../components/sections/Contact"
import GalleryShowcase from "../components/sections/GalleryShowcase"

export default function BadRenovationZuerich() {
  return (
    <>
      <Seo
        title="Bad Renovation Zürich – Fliesen & Umbau"
        description="Bad Renovation in Zürich: neue Fliesen, saubere Abdichtung und professionelle Ausführung. Sehen Sie Referenzen und fragen Sie Ihre Offerte an."
        path="/badrenovation-zuerich"
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-10">
        <BackToHome className="mb-6" />
        <h1 className="hero-title mb-4">Bad Renovation Zürich – Fliesen & Umbau</h1>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-3xl text-safe">
          Von der Vorbereitung bis zur finalen Fuge: Wir renovieren Badezimmer mit Fokus auf Dichtigkeit, saubere Details und
          hochwertige Optik. Ideal für Duschen, Nasszellen und komplette Badumbauten.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Ablauf</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Planung", text: "Wir klären Flächen, Material, Untergrund und Terminplan." },
            { title: "Vorbereitung", text: "Untergrund prüfen, Abdichtung, Gefälle und Details sauber vorbereiten." },
            { title: "Verlegung & Finish", text: "Exakte Schnitte, saubere Fugen und sorgfältige Übergänge." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-2">
                {s.title}
              </h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <GalleryShowcase
        title="Vorher / Nachher & Referenzen"
        description="„Aus alt wird neu – mit sauberen Details und perfektem Finish.“"
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Kosten & Beratung</h2>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed max-w-3xl text-safe">
          Bei Badrenovationen sind Untergrund, Abdichtung, Gefälle und Details entscheidend. Darum kalkulieren wir nach Besichtigung
          oder sauberer Projektinfo – damit Preis und Leistung stimmen.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Wie lange dauert eine Badrenovation?",
              a: "Das hängt vom Umfang ab (Wände/Boden/Details). Nach kurzem Projektcheck geben wir Ihnen einen realistischen Zeitplan.",
            },
            {
              q: "Macht ihr auch nur die Fliesen (ohne komplette Demontage)?",
              a: "Ja – wir können Teilbereiche oder reine Plattenarbeiten übernehmen, sofern der Untergrund passt.",
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

